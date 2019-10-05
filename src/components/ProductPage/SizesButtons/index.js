import React from 'react'
import Button from "./Button"

import styles from './SizesButton.module.sass'


const SizesButtons = ({ items, titles, activeIndex, onClick }) => {
  console.log(activeIndex);
  return (
    <div className={styles.sizesButtons}>
      {
        items.map((product, index) => {
            return (
              <Button
                key={index}
                sizeIndex={index}
                title={titles[index]}
                price={product.price}
                active={activeIndex === index}
                onClick={() => onClick(index)}
              />
            )
          }
        )
      }
    </div>
  );
};

export default SizesButtons;