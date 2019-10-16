import { generateProducts } from 'other/sampleData'

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

const additionalProducts = [
  {
    id: 0,
    title: 'Modern clear vase',
    desc: 'Vase made from clear glass. Height 20 cm and width 13 cm made from good quality thick glass.',
    price: 900,
    image: 'https://images.serenataassets.com/image/upload/f_auto,q_auto/t_Product100s/v1/Raw/108406_standing'
  },
  {
    id: 1,
    title: 'Bellante Sparkling Rosé',
    desc: 'Bottle Size:75cl\n' +
      'Only 18+ can buy this item\n' +
      'Not available to send separately\n' +
      'Price includes delivery',
    price: 400,
    image: 'https://asset1.cxnmarksandspencer.com/is/image/mands/SD_FD_F44A_00367004_NC_X_EC_0?$PDP_ADD_CAR_IMAGE$'
  }
]

const initialState = {
  products: generateProducts(),
  grass,
  additionalProducts
}

const catalog = (state = initialState) => {
  return state
}

export default catalog