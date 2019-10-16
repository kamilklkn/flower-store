import React from 'react';
import styles from './GrassPluserButton.module.sass';


const GrassPluserButton = ({ index, title, price, active, onClick }) => {
  const cls = [styles.button]
  active && cls.push(styles.active)

  return (
    <div
      key={index}
      className={cls.join(' ')}
      onClick={() => onClick(index)}
    >
      {title} {price > 0 && `(+${price}\u20BD)`}
    </div>
  )
}

export default GrassPluserButton;