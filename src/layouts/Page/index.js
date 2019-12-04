import React, { Component } from 'react'
import CartButton from "components/Cart/CartButton";
import { Link } from "react-router-dom"
import styles from './pageLayout.module.sass'


class PageLayout extends Component {
  render() {
    return (
      <>
        <div className={styles.menu}>
          <Link to="/catalog/">Каталог</Link>
          <Link to="/cart/">Корзина</Link>
          <CartButton/>
        </div>

        {this.props.children}
      </>
    )
  }
}

export default PageLayout