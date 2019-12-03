import React, { Component } from 'react'
import { connect } from "react-redux"
import Preloader from "components/Preloader"
import AdditionalProducts from "components/ProductDetails/AdditionalProducts"
import { additionalProductsSelector } from "store/selectors/additionalProducts"
import { fetchAdditionalProducts } from "store/actions/additionalProductsActions"

class AdditionalProductsContainer extends Component {
  // componentDidMount() {
  //   this.props.fetchData()
  // }

  render() {
    const { products } = this.props
    console.log(products)

    if (!products.length) return <Preloader/>

    return (
        <AdditionalProducts products={products}/>
    )
  }
}

const mapStateToProps = state => ({
  products: additionalProductsSelector(state)
})

const mapDispatchToProps = dispatch => ({
  fetchData: dispatch(fetchAdditionalProducts())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalProductsContainer)