import { generateProducts } from 'other/sampleData'
import { normalizeObjects } from "utils"

const grass = [
  {
    id: 0,
    name: 'Нет',
    price: 0
  },
  {
    id: 1,
    name: 'Немного',
    price: 100
  },
  {
    id: 2,
    name: 'Побольше',
    price: 300
  }
]

export default {
  products: normalizeObjects('products', generateProducts()),
  grass: normalizeObjects('grass', grass)
}