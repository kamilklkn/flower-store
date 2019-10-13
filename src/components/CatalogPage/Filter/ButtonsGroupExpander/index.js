import React, { useState } from 'react'
import styles from './ButtonsGroupExpander.module.sass';


const ButtonsGroupExpander = ({ title, children, className }) => {
  const [expand, setExpand] = useState(true)
  return (
    <div className={styles[className]}>
      <p onClick={() => setExpand(!expand)}>{title}</p>
      {
        expand && children
      }
    </div>
  )
}

export default ButtonsGroupExpander