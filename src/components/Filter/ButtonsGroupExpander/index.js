import React, { useState } from 'react'
import styles from './ButtonsGroupExpander.module.sass'
import {classes} from "utils"

const ButtonsGroupExpander = ({
                                title,
                                children,
                                filterKey,
                                expandDefault = true,
                                showResetButton = false,
                                onResetFilter
                              }) => {
  const [expand, setExpand] = useState(expandDefault)
  return (
    <div className={classes(styles[filterKey])}>
      <p>
        <span
          onClick={() => setExpand(!expand)}
          className={styles.group}
        >{title}</span>

        {
          showResetButton &&
          <span
            onClick={() => onResetFilter(filterKey)}
            className={styles.reset}
          >Сбросить</span>
        }
      </p>
      {
        expand && children
      }
    </div>
  )
}

export default ButtonsGroupExpander