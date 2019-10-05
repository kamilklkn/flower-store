import React, { Component } from 'react'
import SizeInformer from "components/ProductPage/SizeInformer"
import GrassPluser from "components/ProductPage/GrassPluser"
import SizesButtons from "components/ProductPage/SizesButtons"

import styles from './Product.module.sass'


class Product extends Component {
  constructor(props) {
    super(props);
    this.handleSizeButtonClick = this.handleSizeButtonClick.bind(this)
    this.handleGrassPluserButtonClick = this.handleGrassPluserButtonClick.bind(this)
  }

  state = {
    sizesTitles: [
      'Стандартный', 'Большой', 'Премиум', 'Вау!'
    ],
    grassItems: [
      {
        title: 'Нет',
        price: 0
      },
      {
        title: 'Немного',
        price: 100
      },
      {
        title: 'Побольше',
        price: 300
      }
    ],

    id: 1,
    order: 1,
    activeSizeIndex: 0,
    activeGrassIndex: 0,
    title: 'Монобукет Мисти Бабблс',
    slug: 'monobuket-kustovoj-pionovidnoj-rozy',
    desc: '',
    sizes: [
      {
        id: 0,
        h: 25,
        w: 35,
        image: 'https://klumba.store/media/%D0%93%D0%BE%D1%80%D1%82%D0%B5%D0%BD%D0%B7%D0%B8%D0%B8_%D1%86%D0%B2%D0%B5%D1%82%D1%8B_%D1%87%D0%B8%D1%82%D0%B0_%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0_%D0%BA%D0%BB%D1%83%D0%BC%D0%B1%D0%B0.JPG',
        price: 2500
      },
      {
        id: 1,
        h: 34,
        w: 40,
        image: 'https://klumba.store/media/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_viber_2019-06-23_10-51-04.jpg',
        price: 3400
      },
      {
        id: 2,
        h: 50,
        w: 68,
        price: 5200
      },
    ]
  }

  handleSizeButtonClick = (itemIndex) => {
    console.log(itemIndex);
    this.setState({
      activeSizeIndex: itemIndex
    })
  }

  handleGrassPluserButtonClick = (itemIndex) => {
    console.log(itemIndex);
    this.setState({
      activeGrassIndex: itemIndex
    })
  }

  render() {
    const activeSize = this.state.sizes[this.state.activeSizeIndex]
    const activeGrass = this.state.grassItems[this.state.activeGrassIndex]
    const totalPrice = activeSize.price
      + activeGrass.price

    return (
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img className="img-fluid" src={activeSize.image || this.state.sizes[0].image} alt=""/>
          </div>
          <div className={`col-6 ${styles.usn} ${styles.df}`}>
            <h3>{this.state.title}</h3>

            <SizesButtons
              items={this.state.sizes}
              titles={this.state.sizesTitles}
              activeIndex={this.state.activeSizeIndex}
              onClick={this.handleSizeButtonClick}
            />

            <br/>
            <SizeInformer
              h={activeSize.h}
              w={activeSize.w}
            />

            <GrassPluser
              items={this.state.grassItems}
              activeIndex={this.state.activeGrassIndex}
              onClick={this.handleGrassPluserButtonClick}
            />

            <br/>
            <h1>{totalPrice} &#8381;</h1>

          </div>
        </div>
      </div>
    );
  }
}

export default Product