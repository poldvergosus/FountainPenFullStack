import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const SimilarProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {

        if (products.length > 0) {
      let productsCopy = [...products];

      productsCopy = productsCopy.filter(item => item.category === category);
      productsCopy = productsCopy.filter(item => item.brand === subCategory);

      const similar = productsCopy.slice(0, 5);

      setRelated(similar);
      console.log('Похожие товары:', similar); // ✅ будет выводиться
    }
  }, [products, category, subCategory]);

    return (
        <div>

        </div>
    )
}

export default SimilarProducts
