import mockProducts from './mockProducts'
import mockAdditional from './mockAdditionalProducts'
import axios from "axios"

// console.log(mockProducts)
// console.log(mockAdditional)

// todo Посмотри как объединить api, ведь путь одинаков
//  api/products/
//  api/products/idn1

export const fetchProducts = async () => {
   return new Promise((resolve, reject) => {
      resolve(mockProducts)
   })
}

export const fetchProduct = async (slug) => {
   // console.log('api fetchProduct', slug)
   return new Promise((resolve, reject) => {
      const product = mockProducts.find(item => item.slug === slug)
      // console.log(product, slug)
      product ?
         setTimeout(() => resolve(product), 0) :
         reject('no product 404')
   })
}

export const fetchAdditionalProducts = async () => {
   return new Promise((resolve, reject) => {
      setTimeout(() => resolve(mockAdditional), 0)
   })
}

export const fetchOrderConfirmation = async () => {
   const url = `http://localhost:3500/api/v1/order-confirmation`

   return await axios.get(url)
      .then(function (response) {
         return response.data
      })
      .catch(function (error) {
         console.log(error)
      })
}
