import React, { useState } from 'react'
import styles from './Details.module.sass'

const Details = (props) => {
  const [visible, setVisible] = useState(true)

  return (
    <div>
      <h4 onClick={() => setVisible(!visible)}>Детали</h4>
      {
        visible && (
          <>
            {props.children}
          </>
        )
      }

    </div>
  );
};

export default Details;