import React, { useContext } from "react"
import { ShopContext } from "../context/ShopContext"
import ProductGrid from "./ProductGrid"

const NewSection = () => {
  const { products } = useContext(ShopContext)
  const latestProducts = products.slice(-9)

  return <ProductGrid title="Новинки" products={latestProducts} />
}

export default NewSection