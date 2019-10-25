import { generateProducts } from 'other/sampleData'

import im_a1 from 'assets/im_a1.webp'
import im_a2 from 'assets/im_a2.jpeg'

const grass = [
  {
    name: 'Нет',
    price: 0
  },
  {
    name: 'Немного',
    price: 100
  },
  {
    name: 'Побольше',
    price: 300
  }
]

const allAdditionalProducts = [
  {
    id: 0,
    title: 'Modern clear vase',
    desc: 'Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass.',
    price: 900,
    image: im_a1
  },
  {
    id: 1,
    title: 'Bellante Sparkling Rosé',
    desc: 'Bottle Size:75cl\n' +
      'Only 18+ can buy this item\n' +
      'Not available to send separately\n' +
      'Price includes delivery',
    price: 400,
    image: im_a2
  }
]

const initialState = {
  products: generateProducts(),
  grass,
  allAdditionalProducts
}

const catalog = (state = initialState) => {
  return state
}

export default catalog