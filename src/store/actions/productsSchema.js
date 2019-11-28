import { schema } from 'normalizr'

export const product = new schema.Entity('products')
export const arrayOfProducts = new schema.Array(product)