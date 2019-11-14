import React, { Component } from 'react'
// import CartButton from "components/Cart/CartButton";

class PageLayout extends Component {
  render() {
    return (
      <>
        {/*<CartButton/>*/}
        <main>
          {this.props.children}
        </main>
      </>
    )
  }
}

export default PageLayout