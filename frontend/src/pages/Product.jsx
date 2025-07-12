import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import SimilarProducts from '../components/SimilarProducts';

const Product = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const { currency } = useContext(ShopContext);

  useEffect(() => {
    const foundProduct = products.find(
      item => item.id.toString() === productId.toString()
    );

    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image);
    } else {
      console.warn("Продукт не найден по ID:", productId);
    }
  }, [productId, products]);

  return productData ? (
    <div className=' pt-10 transition-opacity ease-in duration-500 opacity-100'>
      <div className='max-w-5xl mx-auto'>

        {/* Заголовок */}
        <h1 className='font-bold text-3xl mb-6 text-primary'>{productData.title} {productData.desc}</h1>

        <div className='flex flex-col sm:flex-row gap-8 items-start'>

          {/* Левая часть*/}
          <div className='flex flex-col w-full sm:w-1/2'>
            <div className='w-full'>
              <img src={image} alt={productData.title} className="w-ful border-4 border-primary " />
            </div>
            <p className='text-3xl text-primary font-extrabold mt-4'>{productData.price} {currency} </p>
            <button className='text-2xl mt-4 w-full bg-primary text-white font-bold py-3 hover:bg-accent transition'>В корзину</button>
          </div>

          {/* Правая часть*/}
          <div className='flex-1'>
            {productData.details.split('\n\n').map((paragraph, index) => (
              <p key={index} className='text-base text-primary mb-4'>
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

            <div className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4  hover:bg-accent transition">
              <span className="font-medium">Бренд</span>
              <span>{productData.brand}</span>
            </div>
            <div className=" cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition">
              <span className="font-medium">Размер пера</span>
              <span>{productData.size}</span>
            </div>
            <div className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition">
              <span className="font-medium">Материал пера</span>
              <span>{productData.nibmaterial ? 'Золото' : 'Сталь'}</span>
            </div>
            <div className="cursor-pointer flex justify-between py-4 border-b-2 border-white px-4 hover:bg-accent transition">
              <span className="font-medium">Категория</span>
              <span>{productData.category}</span>
            </div>

          </div>
        </div>

<SimilarProducts  category={productData.category} subCategory={productData.brand}/>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product;
