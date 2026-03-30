import clsx from 'clsx'
import React, { useContext } from 'react'
import { ShopContext } from "../context/ShopContext";
import { Link, useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/format';

const ProductGrid = ({ title, products = [], onSizeClick, columns = 3 }) => {
  const { currency } = useContext(ShopContext);
  const navigate = useNavigate();
  
  const responsiveGridClass = `
    grid-cols-2 
    sm:grid-cols-3 
  `;

  const handleSizeClick = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSizeClick) {
      onSizeClick(size);
    } else {
      navigate(`/collection?size=${encodeURIComponent(size)}`);
    }
  };

  return (
    <section className="mt-[2.5rem] -my-8 w-full">
      {/* Заголовок */}
      {title && (
        <h2 className="section-title flex items-center justify-center font-literata font-bold text-primary text-[clamp(1.8rem,4vw,2.5rem)] leading-[71px] gap-8 relative max-w-[90%] mx-auto mb-[2rem]">
          <span className="flex-1 h-[3px] bg-primary"></span>
          {title}
          <span className="flex-1 h-[3px] bg-primary"></span>
        </h2>
      )}
      
      <div className={clsx('grid gap-3', responsiveGridClass)}>
        {products.map((product, index) => {
          const stock = product.stock ?? 0;
          const isOutOfStock = stock === 0;
          const isLowStock = stock > 0 && stock <= 5;

          return (
            <Link
              to={`/product/${product._id}`}
              key={index}
              className={`border-[4px] border-primary p-[0.2rem] w-full h-full flex flex-col group transition-all duration-300 ${
                isOutOfStock ? 'opacity-70 hover:opacity-100' : ''
              }`}
            >
              <div className="border-[2px] border-primary p-4 flex flex-col flex-grow relative">

                {/* Размер пера */}
                <span
                  role="button"
                  onClick={(e) => handleSizeClick(e, product.size)}
                  className="absolute top-4 left-4 border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center hover:bg-accent hover:text-white hover:border-accent transition z-10"
                  style={{ width: '2.5rem', height: '1.8rem' }}
                >
                  {product.size}
                </span>

                {/* Изображение */}
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full mb-4 mt-7 transition-all duration-300 ${
                    isOutOfStock ? 'grayscale group-hover:grayscale-0' : ''
                  }`}
                />

                <div className="flex flex-col flex-grow">
                  <h3 className="font-literata font-semibold text-lg text-primary mb-1 line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="font-literata text-sm text-primary mb-1 flex-grow">
                    {product.desc}
                  </p>
                  
                  {/* Цена и статус наличия */}
                  <div className="flex justify-between items-end mt-3">
                    <strong className={`text-lg font-extrabold font-literata ${
                      isOutOfStock ? 'text-gray-400' : 'text-primary'
                    }`}>
                      {formatPrice(product.price)} {currency}
                    </strong>
                    
    
                    {isOutOfStock && (
                      <span className="text-xs font-semibold text-red-500">
                        Нет в наличии
                      </span>
                    )}
                    {isLowStock && (
                      <span className="text-xs font-semibold text-yellow-600">
                        Осталось {stock} шт.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  )
}

export default ProductGrid