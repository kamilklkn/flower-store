import { CART_PRODUCT_DECREASE, CART_PRODUCT_INCREASE, CART_PRODUCT_REMOVE } from "store/actionTypes"

export const cartProductIncrease = id => ({
  type: CART_PRODUCT_INCREASE,
  id
})

export const cartProductDecrease = id => ({
  type: CART_PRODUCT_DECREASE,
  id
})

export const cartProductRemove = (id) => ({
  type: CART_PRODUCT_REMOVE,
  id
})

// тип запроса - объект - действие
