import { normalizeObjects } from "utils"
import im_a1 from "assets/im_a1.webp"
import im_a2 from "assets/im_a2.jpeg"

const items = [
  {
    id: 'id0',
    title: 'Modern clear vase',
    desc: 'Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass.',
    price: 900,
    image: im_a1
  },
  {
    id: '1id',
    title: 'Bellante Sparkling Rosé',
    desc: 'Bottle Size:75cl\n' +
      'Only 18+ can buy this item\n' +
      'Not available to send separately\n' +
      'Price includes delivery',
    price: 400,
    image: im_a2
  }
]

export default {
  additionalProducts: normalizeObjects('products', items)
}