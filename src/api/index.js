import products from './mockProducts'

export const fetchProducts = async () => {
  return new Promise((resolve, reject) => {
    resolve(products)
  })
}