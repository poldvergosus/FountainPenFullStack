import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductGrid from '../components/ProductGrid'
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './Collection.css';
import { Disclosure } from '@headlessui/react'
import { useLocation, useParams, useNavigate } from 'react-router-dom';


const Collection = () => {
  // =========================
  // STATE
  // =========================
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(true); // пока заглушка
  const [sortOrder, setSortOrder] = useState('price-asc');
  const [visibleCount, setVisibleCount] = useState(12);

  // =========================
  //  ДАННЫЕ ПРОДУКТОВ
  // =========================
  const { products = [] } = useContext(ShopContext) || {};
  const { search, showSearch } = useContext(ShopContext);
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const querySearch = queryParams.get('q')?.toLowerCase() || "";
  const querySize = queryParams.get('size') || null;

  //  Ценовой диапазон
  const prices = products.map(p => Number(p.price)).filter(p => !isNaN(p));
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 100000;
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const { brandName } = useParams();

  //  Массивы фильтров (бренды, размеры, цвета)
  const allBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brand).filter(Boolean))];
  }, [products]);
  const allSizes = useMemo(() => {
    return [...new Set(products.map(p => p.size).filter(Boolean))];
  }, [products]);

  const allColors = useMemo(() => {
    return products
      .flatMap(p => p.colors || [])
      .filter((color, index, self) =>
        index === self.findIndex(c => c.name === color.name)
      );
  }, [products]);

  // =========================
  //  ФИЛЬТРАЦИЯ И СОРТИРОВКА
  // =========================
  const searchWords = querySearch.toLowerCase().split(" ").filter(Boolean);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      const price = Number(p.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand);
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(p.size);
      const matchesColor =
        selectedColors.length === 0 ||
        (p.colors && p.colors.some(color => selectedColors.includes(color.name)));

      const combinedText = `
      ${p.title}
      ${p.desc}
      ${p.brand}
      ${p.size}
    `.toLowerCase();

      const matchesSearch =
        searchWords.length === 0 ||
        searchWords.every((word) => combinedText.includes(word));

      return matchesPrice && matchesBrand && matchesSize && matchesColor && matchesSearch;
    });

    return [...filtered].sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);
      if (sortOrder === 'price-asc') return priceA - priceB;
      if (sortOrder === 'price-desc') return priceB - priceA;
      return 0;
    });
  }, [
    products,
    priceRange,
    selectedBrands,
    selectedSizes,
    selectedColors,
    sortOrder,
    querySearch,
  ]);

  const resetFilters = () => {
    setSelectedBrands([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(true);
    setPriceRange([minPrice, maxPrice]);
  };

  // =========================
  // ОСНОВНЫЕ HANDLERS ДЛЯ ФИЛЬТРОВ
  // =========================
  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleColorToggle = (colorName) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  // =========================
  // noUiSlider — ИНИЦИАЛИЗАЦИЯ
  // =========================
  const sliderRef = useRef(null);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);

  useEffect(() => {
    if (brandName) {
      const actualBrand = allBrands.find(b => b.toLowerCase() === brandName.toLowerCase());

      if (actualBrand) {
        setSelectedBrands([actualBrand]);
      } else {
        setSelectedBrands([]);
      }
    } else {
      setSelectedBrands([]);
    }
  }, [brandName, allBrands]);

  useEffect(() => {
    if (querySize) {
      setSelectedSizes([querySize]);
      setVisibleCount(12);
    }
  }, [querySize]);

  const handleSizeFromCard = (size) => {
    setSelectedSizes([size]);
    setVisibleCount(12);
    const qs = new URLSearchParams(location.search);
    qs.set('size', size);
    navigate({ pathname: location.pathname, search: qs.toString() }, { replace: false });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || el.noUiSlider) return;

    noUiSlider.create(el, {
      start: priceRange,
      connect: true,
      step: 50,
      range: { min: minPrice, max: maxPrice },
      tooltips: false,
    });

    const slider = el.noUiSlider;

    slider.on('update', (values) => {
      const [min, max] = values.map(Number);
      setPriceRange([min, max]);
      if (minInputRef.current) minInputRef.current.value = min;
      if (maxInputRef.current) maxInputRef.current.value = max;
    });

    const updateSliderFromInputs = () => {
      const min = Number(minInputRef.current.value) || 0;
      const max = Number(maxInputRef.current.value) || 0;
      slider.set([min, max]);
    };

    minInputRef.current?.addEventListener('change', updateSliderFromInputs);
    maxInputRef.current?.addEventListener('change', updateSliderFromInputs);

    return () => {
      slider?.destroy();
    };
  }, [sliderRef.current]);

  return (
    <div className="w-full px-4 pt-10">
      <div className="flex flex-col 2xl:flex-row gap-10 max-w-[1760px] mx-auto">
        {/* ЛЕВЫЙ ФИЛЬТР */}
        <div className="w-full 2xl:max-w-[20rem]">
          <p
            className='font-bold flex items-center cursor-pointer gap-2 mb-3 text-primary font-literata'
            onClick={() => setShowFilter(!showFilter)}
          >
            ФИЛЬТРЫ <span className='2xl:hidden'>{showFilter ? '▲' : '▼'}</span>
          </p>

          {/* Блок с фильтрами и рамкой */}
          <div className={`sticky top-0 z-10 border-2 border-primary ${showFilter ? 'block' : 'hidden'} 2xl:block p-4`}>

            {/* === РАЗМЕР === */}
            <Disclosure defaultOpen={true}>
              {({ open }) => (
                <div className="border-b border-primary mb-2">
                  <Disclosure.Button className="flex justify-between w-full mt-3 font-literata text-sm text-primary mb-6">
                    Размер
                    <span>{open ? '−' : '+'}</span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="pl-3 flex flex-wrap gap-2 mt-2 mb-6">
                    {allSizes.map((size) => (
                      <label key={size} className="relative cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedSizes.includes(size)}
                          onChange={() => handleSizeToggle(size)}
                          className="sr-only"
                        />
                        <span
                          className={`border-[0.2em] rounded-full text-primary text-xs font-regular flex items-center justify-center ${selectedSizes.includes(size) ? 'bg-primary text-white border-primary' : 'border-primary'
                            }`}
                          style={{ width: '2.5rem', height: '1.8rem' }}
                        >
                          {size}
                        </span>
                      </label>
                    ))}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* === ЦЕНА === */}
            <div className="border-b border-primary">
              <Disclosure defaultOpen={true}>
                {({ open }) => {
                  useEffect(() => {
                    setIsPriceOpen(open)
                  }, [open])

                  return (
                    <div className="mb-6">
                      <Disclosure.Button className="flex justify-between w-full mt-3 font-literata text-sm text-primary mb-1">
                        Цена
                        <span>{open ? '−' : '+'}</span>
                      </Disclosure.Button>

                      <Disclosure.Panel>
                        <div className="flex flex-col gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="number"
                                ref={minInputRef}
                                className="border border-primary rounded px-2 py-1 w-20 text-sm no-spinner text-primary"
                              />
                            </label>
                            <span className="text-gray-500">—</span>
                            <label className="flex items-center gap-1 text-sm">
                              <input
                                type="number"
                                ref={maxInputRef}
                                className="border border-primary rounded px-2 py-1 w-20 text-sm no-spinner text-primary"
                              />
                            </label>
                          </div>

                          <div
                            ref={sliderRef}
                            id="slider-round"
                            className="w-full h-[2.5rem]"
                          ></div>
                        </div>
                      </Disclosure.Panel>
                    </div>
                  )
                }}
              </Disclosure>
            </div>

            {/* === НАЛИЧИЕ === */}
            <Disclosure defaultOpen={true}>
              {({ open }) => (
                <div className="border-b border-primary mb-6">
                  <Disclosure.Button className="flex justify-between w-full mt-3 font-literata text-sm text-primary mb-6">
                    Наличие
                    <span>{open ? '−' : '+'}</span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="pl-3">
                    <label className="flex items-center text-sm gap-2 font-literata text-primary cursor-pointer pb-4">
                      <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={() => setInStockOnly(!inStockOnly)}
                      />
                      В наличии
                    </label>
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>

            {/* === БРЕНД === */}
            <Disclosure>
              {({ open }) => (
                <div className="border-b border-primary mb-6">
                  <Disclosure.Button className="flex justify-between w-full mt-3 font-literata text-sm text-primary mb-6">
                    Бренд
                    <span>{open ? '−' : '+'}</span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="pl-3">
                    {allBrands.map((brand) => (
                      <label key={brand} className="flex items-center text-sm gap-2 cursor-pointer my-1 font-literata text-primary last:pb-4">
                        <input
                          type="checkbox"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                        />
                        {brand}
                      </label>
                    ))}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>


            {/* === ЦВЕТ === */}
            <Disclosure>
              {({ open }) => (
                <div className="border-b border-primary mb-6">
                  <Disclosure.Button className="flex justify-between w-full mt-3 font-literata text-sm text-primary mb-6">
                    Цвет
                    <span>{open ? '−' : '+'}</span>
                  </Disclosure.Button>

                  <Disclosure.Panel className="pl-3 flex flex-wrap gap-2 mt-2 mb-6  relative overflow-hidden">
                    {allColors.map((color) => (
                      <label
                        key={color.name}
                        className="relative cursor-pointer group"
                        title={color.name}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={selectedColors.includes(color.name)}
                          onChange={() => handleColorToggle(color.name)}
                        />
                        <span
                          className={`border-[0.2em] rounded-full text-xs font-regular flex items-center justify-center ${selectedColors.includes(color.name)
                            ? 'border-primary'
                            : 'border-primary'
                            }`}
                          style={{
                            width: '2.5rem',
                            height: '1.8rem',
                            backgroundColor: color.isTransparent ? 'transparent' : color.hex,
                            backgroundImage: color.isTransparent
                              ? `linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc),
                               linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%, #ccc)`
                              : undefined,
                            backgroundPosition: color.isTransparent ? '0 0, 5px 5px' : undefined,
                            backgroundSize: color.isTransparent ? '10px 10px' : undefined,
                            borderColor: 'var(--color-primary)',
                            borderWidth: selectedColors.includes(color.name) ? '3px' : '2px',
                            boxShadow: selectedColors.includes(color.name)
                              ? 'inset 0 0 0 2px var(--color-primary)'
                              : 'none'
                          }}
                        >
                          {selectedColors.includes(color.name)
                          }
                        </span>
                        {/* Tooltip */}
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2
  px-2 py-1 text-xs text-white bg-gray-800 rounded
  opacity-0 group-hover:opacity-100 transition-opacity
  pointer-events-none z-10 text-center text-ellipsis overflow-hidden max-w-[120px] break-words">
                          {color.name}
                        </span>
                      </label>
                    ))}
                  </Disclosure.Panel>
                </div>
              )}
            </Disclosure>
            <div className="mt-4 flex justify-start">
              <button
                onClick={resetFilters}
                className="px-4 py-2 border-2 border-primary text-primary text-sm rounded hover:text-accent hover:border-accent font-medium transition"
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <div className="flex justify-end mb-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="border-2 border-primary text-sm px-2 py-1 text-primary focus:outline-none bg-white"
            >
              <option value="price-asc">По возрастанию цены</option>
              <option value="price-desc">По убыванию цены</option>
            </select>
          </div>

          {querySearch && (
            <h2 className="text-lg sm:text-xl font-medium mb-6 text-primary">
              Результаты поиска для: <span className="italic font-semibold">{querySearch}</span>
            </h2>
          )}
          <ProductGrid products={filteredProducts.slice(0, visibleCount)} columns={3} onSizeClick={handleSizeFromCard} />

          {/* Показать ещё */}
          {visibleCount < filteredProducts.length && (
            <div className="mt-12 text-center">
              <button
                onClick={loadMore}
                className="px-4 py-2 border-2 border-primary text-primary text-sm rounded hover:bg-primary hover:text-white font-medium transition"
              >
                Показать еще
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )



}

export default Collection
