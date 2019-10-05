import React from 'react';
import styles from './GrassPluser.module.sass';


const GrassPluser = ({ items, activeIndex, onClick }) => {

  return (
    <div className={styles.pluser}>
      Добавить зелени?
      <div className={styles.items}>
        {
          items.map((item, index) => {
              const cls = [styles.item]
              activeIndex === index && cls.push(styles.active)
              return (
                <div
                  key={index}
                  className={cls.join(' ')}
                  onClick={() => onClick(index)}
                >
                  {item.title} (+{item.price}{`\u20BD`})
                </div>
              )
            }
          )
        }
      </div>

    </div>
  );
};

export default GrassPluser;