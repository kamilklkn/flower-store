import React from 'react'
import styles from './SizesButton.module.sass'


const Button = ({
                  sizeIndex = 0,
                  title = '',
                  price = '',
                  active = false,
                  onClick
                }) => {
  const cls = [styles.button]
  active && cls.push(styles.active)
  return (
    <div
      className={cls.join(' ')}
      onClick={() => onClick(sizeIndex)}
    >
      {title} <br/>
      {price} {`\u20BD`}
    </div>
  );
};

export default Button;