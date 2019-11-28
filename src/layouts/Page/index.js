import React, { Component } from 'react'

// import CartButton from "components/Cart/CartButton";

class PageLayout extends Component {
  render() {
    return (
      <>
        {/*<CartButton/>*/}

        {this.props.children}
      </>
    )
  }
}

export default PageLayout