import React, { Component } from 'react'
import { connect } from "react-redux"
import propTypes from "prop-types"
import ProductDetails from "components/ProductDetails"
import Page404 from "pages/404"
import Preloader from "components/Preloader"
import { getRouter } from "store/selectors/router"

import { push } from 'connected-react-router'


class ProductDetailsContainer extends Component {
  // static propTypes = {
  //   products: propTypes.array.isRequired
  // }

  static defaultProps = {
    product: {}
  }

  componentDidMount() {
    // todo use it. Get product from state or from other API /product?slug=...
    // if (!this.props.songDetails)
    //   this.props.loadSongDetails(this.props.songId);
  }

  render() {
    console.log(this.props)

    const { isLoading } = this.props;

    // todo это должно приходить из redux,
    //  это должно быть отдельным экшеном начала загрузки
    //  (понять где это располагать в сторе)
    if (isLoading) return <Preloader />

    // todo USE IT
    // this.props.goToLink('/404')

    // if (!isLoading) return <Page404 />

    return <ProductDetails />;
  }
}

// todo СДЕЛАЙ ТО, ЧТО НАПИСАНО ВО ВКЛАДКАХ СПРАВА

// const productSelector = (state, id) => getProductById(id)


const mapStateToProps = state => ({
  // isLoading: false,
  // product: getProductBySlug(getProductSlug(state))

  // todo use it
  // songId: ownProps.match.params.number,
  // songDetails: getSongDetails(state)
})

// todo https://stackoverflow.com/questions/49213602/how-to-get-id-params-to-redux-action-from-react-router
// todo use it
// const mapDispatchToProps = (dispatch) => ({
//   loadSongDetails: (songId) => dispatch(loadSongDetailsActionCreator(songId))
// })

export default connect(
  mapStateToProps,
  {
    goToLink: push
  }
)(ProductDetailsContainer)
