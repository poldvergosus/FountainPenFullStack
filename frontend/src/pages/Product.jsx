import React, { useContext, useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import SimilarProducts from '../components/SimilarProducts';
import { formatPrice } from '../utils/format';
import { toast } from 'react-toastify';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, currency, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [addedToCart, setAddedToCart] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const foundProduct = products.find(
      item => item._id.toString() === productId.toString()
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image);
    } else {
      console.warn("Продукт не найден по ID:", productId);
    }
  }, [productId, products]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setAddedToCart(false);
  }, [productId]);

  const handleFilterClick = (key, value) => {
    navigate(`/collection?${key}=${encodeURIComponent(value)}`);
  };

  const handleAddToCart = async () => {
    if (!productData || isOutOfStock) return;

    const currentInCart = cartItems[productData._id] || 0;
    const stock = productData.stock ?? 0;

    if (currentInCart >= stock) {
      toast.error(`Максимум ${stock} шт. — уже в корзине`);
      return;
    }

    const success = await addToCart(productData._id);
    if (success) {
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const getStockStatus = () => {
    if (!productData) return null;

    const stock = productData.stock ?? 0;

    if (stock === 0) {
      return {
        text: 'Нет в наличии',
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '✕'
      };
    }

    if (stock <= 3) {
      return {
        text: `Осталось ${stock} шт.`,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: '⚠️'
      };
    }

    if (stock <= (productData.lowStockAlert || 5)) {
      return {
        text: `Осталось ${stock} шт.`,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200',
        icon: '⚠️'
      };
    }

    return {
      text: 'В наличии',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: '✓'
    };
  };

  const stockStatus = productData ? getStockStatus() : null;
  const isOutOfStock = productData && (productData.stock ?? 0) === 0;

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='max-w-5xl mx-auto'>

        {/* Заголовок */}
        <h1 className='font-bold text-3xl mb-6 text-primary'>
          {productData.title} {productData.desc}
        </h1>

        <div className='flex flex-col sm:flex-row gap-8 items-start'>

          {/* Левая часть */}
          <div className='flex flex-col w-full sm:w-1/2 m-0'>
            <div className='w-full relative'>
              <img
                src={image}
                alt={productData.title}
                className={`w-full border-4 border-primary ${isOutOfStock ? 'opacity-60' : ''}`}
              />

              {isOutOfStock && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 text-sm font-bold rounded shadow-lg">
                  Нет в наличии
                </div>
              )}
            </div>

            <p className='text-3xl text-primary font-extrabold mt-4 text-center'>
              {formatPrice(productData.price)} {currency}
            </p>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`text-2xl mt-4 w-full font-bold py-3 transition-all duration-300 ${isOutOfStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : addedToCart
                    ? 'bg-green-600 text-white'
                    : 'bg-primary text-white hover:bg-accent'
                }`}
            >
              {isOutOfStock
                ? 'Нет в наличии'
                : addedToCart
                  ? '✓ Добавлено'
                  : 'В корзину'
              }
            </button>

            {isOutOfStock && (
              <p className="text-center text-sm text-gray-500 mt-2">
                Свяжитесь с нами для предзаказа
              </p>
            )}
          </div>

          {/* Правая часть */}
          <div className='flex-1'>
            {productData.details.split('\n\n').map((paragraph, index) => (
              <p key={index} className='text-base text-primary mb-4 p-5 md:p-0'>
                {paragraph.split('\n').map((line, lineIndex) => (
                  <React.Fragment key={lineIndex}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Заголовок секции */}
        <h2 className="section-title flex items-center justify-center font-literata font-bold text-primary text-[clamp(1.8rem,4vw,2.5rem)] leading-[71px] gap-8 relative max-w-[90%] mx-auto mb-2">
          <span className="flex-1 h-[3px] bg-primary"></span>
          Характеристики
          <span className="flex-1 h-[3px] bg-primary"></span>
        </h2>

        {/* Контейнер характеристик */}
        <div className="max-w-5xl mx-auto w-full">
          <div className="bg-primary text-white w-full">

            <div
              onClick={() => handleFilterClick("brand", productData.brand)}
              className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition"
            >
              <span className="font-medium">Бренд</span>
              <span>{productData.brand}</span>
            </div>

            <div
              onClick={() => handleFilterClick("size", productData.size)}
              className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition"
            >
              <span className="font-medium">Размер пера</span>
              <span>{productData.size}</span>
            </div>

            <div
              onClick={() =>
                handleFilterClick("nibmaterial", productData.nibmaterial ? 'Золото' : 'Сталь')
              }
              className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition"
            >
              <span className="font-medium">Материал пера</span>
              <span>{productData.nibmaterial ? 'Золото' : 'Сталь'}</span>
            </div>

            <div
              onClick={() => handleFilterClick("category", productData.category)}
              className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition"
            >
              <span className="font-medium">Категория</span>
              <span>{productData.category}</span>
            </div>

            <div className="flex justify-between py-4 px-4">
              <span className="font-medium">Наличие</span>
              <span className={`font-semibold ${isOutOfStock
                  ? 'text-red-300'
                  : (productData.stock || 0) <= (productData.lowStockAlert || 5)
                    ? 'text-yellow-300'
                    : 'text-green-300'
                }`}>
                {isOutOfStock
                  ? 'Нет в наличии'
                  : `В наличии (${productData.stock} шт.)`
                }
              </span>
            </div>
          </div>
        </div>

        <SimilarProducts
          currentId={productData._id}
          category={productData.category}
          brand={productData.brand}
          colorNames={(productData.colors || []).map(c => c.name ?? c)}
        />
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;