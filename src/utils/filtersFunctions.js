export const byColors = (products, selected = []) =>
  products.filter(product =>
    selected.includes(product.color)
  )


export const bySizes = (products, selected = []) => {
  return products.filter(product =>
    product.sizes.some(size =>
      selected.includes(size.title)
    )
  )
  // return products.reduce((filtered, product) => {
  //   const status = product.sizes.some(size =>
  //     selected.includes(size.title)
  //   )
  //
  //   // todo это походу нужно перенести в контейнер
  //   if (!status) return filtered
  //
  //   product.sizes = product.sizes.map(size => {
  //     size.active = selected.includes(size.title)
  //     return size
  //   })
  //
  //   status && filtered.push(product)
  //   return filtered
  // }, [])
}


export const byShades = (products, selected = []) =>
  products.filter(product => {
      if (!product.shade) return false
      return selected.includes(product.shade)
    }
  )


export const byPacking = (products, selected = []) =>
  products.filter(product => {
      // console.log(product.packing)
      if (!('packing' in product)) return false
      return product.packing.some(pack =>
        selected.includes(pack)
      )
    }
  )


export const bySizesPrice = (products, selected = []) => {
  const [min, max] = selected
  // return products.reduce((filtered, product) => {
  //
  //   const status = product.sizes.some(size =>
  //     size.price >= min && size.price <= max
  //   )
  //
  //   // todo это походу нужно перенести в контейнер
  //   if (!status) return filtered
  //
  //   product.sizes = product.sizes.map(size => {
  //     size.active = size.price >= min && size.price <= max
  //     return size
  //   })
  //
  //   status && filtered.push(product)
  //   return filtered
  // }, [])

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

export const byAvailability = (products) =>
  products.filter(product => !!product.available.now)
