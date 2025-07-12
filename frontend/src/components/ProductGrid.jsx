import clsx from 'clsx'
import React, { useContext } from 'react'
import { ShopContext } from "../context/ShopContext";
import { Link } from 'react-router-dom';

const ProductGrid = ({ title, products, columns = 3 }) => {
  const { currency } = useContext(ShopContext);
const responsiveGridClass = `
  grid-cols-2 
  lg:grid-cols-2 
  xl:grid-cols-3 
`;

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
        {products.map((product, index) => (
          <Link
  to={`/product/${product.id}`} 
            key={index}
            className="border-[4px] border-primary p-[0.2rem] w-full h-full flex flex-col">
            <div className="border-[2px] border-primary p-4 flex flex-col flex-grow relative">

              <span
                className="absolute top-4 left-4 border-[0.2em] border-primary rounded-full text-primary text-xs font-regular flex items-center justify-center"
                style={{ width: '2.5rem', height: '1.8rem' }}
              >
                {product.size}
              </span>

              <img
                src={product.image}
                alt={product.title}
                className="w-full mb-4 mt-7"
              />
              <div className="flex flex-col flex-grow">
                <h3 className="font-literata font-semibold text-lg text-primary mb-1 line-clamp-2">
                  {product.title}
                </h3>
                <p className="font-literata text-sm text-primary mb-1 flex-grow">
                  {product.desc}
                </p>
                <strong className="text-lg font-extrabold font-literata text-primary mt-3">
                  {product.price} {currency}
                </strong>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid


