import React, { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductGrid from "./ProductGrid"

const NewSection = () => {
  const { products } = useContext(ShopContext)

  return <ProductGrid title="Новинки" products={products} />
}

export default NewSection