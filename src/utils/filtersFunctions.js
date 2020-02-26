import { filtersEntities } from 'constants/filtersEntities'

export const byColors = (products, selected = []) =>
   products.filter(product =>
      selected.includes(product.color)
   )

export const bySizes = (products, selected = []) =>
   products.filter(product =>
      product.sizes.some(size =>
         selected.includes(size.title)
      )
   )

// export const byCollections = (products, selected = []) =>
//    products.filter(({collecitions}) => {
//          if (!collecitions) return false
//          return selected.includes(collecitions)
//       }
//    )

export const byShades = (products, selected = []) =>
   products.filter(({ shade }) => {
         if (!shade) return false
         return selected.includes(shade)
      }
   )

export const byPacking = (products, selected = []) =>
   products.filter(product => {
         if (!('packing' in product)) return false
         return product.packing.some(pack =>
            selected.includes(pack)
         )
      }
   )

export const bySizesPrice = (products, selected = []) => {
   const [min, max] = selected
   return products.filter(product =>
      product.sizes.some(size =>
         size.price >= min && size.price <= max
      )
   )
}

export const byFlowers = (products, selected = []) =>
   products.filter(product =>
      product.sizes.some(size =>
         size.flowers.some(flowerEntity => {
               const [flowerTitle] = flowerEntity
               return selected.includes(flowerTitle)
            }
         )
      )
   )

export const byStability = (products, selected = []) =>
   products.filter(product => {
         if (!product.stability) return false
         return selected.includes(product.stability)
      }
   )

export const byAvailability = (products, selectedTitles) => {
   const buttons = filtersEntities.byAvailability.buttons
   const fast = selectedTitles.includes(buttons.fast)
   const expect = selectedTitles.includes(buttons.expect)

   if (selectedTitles.length === 1) {
      if (expect) {
         return products.filter(({available}) => available.expect === true)
      }

      if (fast) {
         return products.filter(({available}) => available.fast === true)
      }
   }

   return products.filter(({available}) =>
      available.expect === true || available.fast === true)

   // return products.filter(({available}) =>
   //    JSON.stringify(available) === JSON.stringify(selected))
}

