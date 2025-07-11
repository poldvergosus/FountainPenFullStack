import React, { useContext, useState, useRef, useEffect, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductGrid from '../components/ProductGrid'
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './Collection.css';
import { Disclosure } from '@headlessui/react'


const Collection = () => {
  // === Состояния фильтров ===
  const [isPriceOpen, setIsPriceOpen] = useState(true)
  const [showFilter, setShowFilter] = useState(false)
  const [selectedBrands, setSelectedBrands] = useState([])
  const [inStockOnly, setInStockOnly] = useState(true); // Заглушка
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  // === Получение данных о продуктах ===
  const { products } = useContext(ShopContext)
  const [visibleCount, setVisibleCount] = useState(12);


  // === Получение цен и установка диапазона ===
  const prices = products.map(p => Number(p.price)).filter(p => !isNaN(p))
  const minPrice = prices.length ? Math.min(...prices) : 0
  const maxPrice = prices.length ? Math.max(...prices) : 100000
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice])

  // === Выделение уникальных брендов ===
  const allBrands = [...new Set(products.map(p => p.brand).filter(Boolean))]

  const allSizes = [...new Set(products.map(p => p.size).filter(Boolean))];

  const allColors = useMemo(() => {
    const colors = products
      .flatMap(p => p.colors || [])
      .filter((color, index, self) =>
        index === self.findIndex(c => c.name === color.name)
      );
    return colors;
  }, [products]);

  // === Логика переключения брендов ===
  const handleBrandToggle = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand))
    } else {
      setSelectedBrands([...selectedBrands, brand])
    }
  }

  // === Логика переключения цветов ===
  const handleColorToggle = (colorName) => {
    if (selectedColors.includes(colorName)) {
      setSelectedColors(selectedColors.filter(c => c !== colorName))
    } else {
      setSelectedColors([...selectedColors, colorName])
    }
  }


  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const handleSizeToggle = (size) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter(s => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  // === Фильтрация продуктов по всем критериям ===
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const price = Number(p.price)
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1]
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(p.brand)
      const matchesSize = selectedSizes.length === 0 || selectedSizes.includes(p.size)
      const matchesColor = selectedColors.length === 0 ||
        (p.colors && p.colors.some(color => selectedColors.includes(color.name)))

      return matchesPrice && matchesBrand && matchesSize && matchesColor
    })
  }, [products, priceRange, selectedBrands, selectedSizes, selectedColors])

  // === Ссылки на элементы слайдера ===
  const sliderRef = useRef(null)
  const minInputRef = useRef(null)
  const maxInputRef = useRef(null)

  // Инициализация noUiSlider – однократно при загрузке
  useEffect(() => {
    const el = sliderRef.current

    if (!el || el.noUiSlider) return

    noUiSlider.create(el, {
      start: priceRange,
      connect: true,
      step: 50,
      range: {
        min: minPrice,
        max: maxPrice
      },
      tooltips: false,
    })


    const slider = el.noUiSlider

    slider.on('update', (values) => {
      const [min, max] = values.map(Number)
      setPriceRange([min, max])
      if (minInputRef.current) minInputRef.current.value = min
      if (maxInputRef.current) maxInputRef.current.value = max
    })

    const updateSliderFromInputs = () => {
      const min = Number(minInputRef.current.value) || 0
      const max = Number(maxInputRef.current.value) || 0
      slider.set([min, max])
    }

    minInputRef.current?.addEventListener('change', updateSliderFromInputs)
    maxInputRef.current?.addEventListener('change', updateSliderFromInputs)

    return () => {
      slider?.destroy()
    }
  }, [sliderRef.current])

  return (
<div className="w-full px-4 pt-10">
  <div className="flex flex-col md:flex-row gap-10 max-w-[1760px] mx-auto">
    {/* ЛЕВЫЙ ФИЛЬТР */}
    <div className="w-full md:max-w-[20rem]">
        <p
          className='font-bold flex items-center cursor-pointer gap-2 mb-3 text-primary font-literata'
          onClick={() => setShowFilter(!showFilter)}
        >
          ФИЛЬТРЫ <span className='md:hidden'>{showFilter ? '▲' : '▼'}</span>
        </p>

        {/* Блок с фильтрами и рамкой */}
        <div className={`sticky top-0 z-10 border-2 border-primary ${showFilter ? 'block' : 'hidden'} md:block p-4`}>

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

        </div>
      </div>

      <div className="flex-grow min-w-0">
        <ProductGrid products={filteredProducts.slice(0, visibleCount)} columns={3} />

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