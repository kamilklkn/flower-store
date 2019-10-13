import React from 'react'
import styles from './ColorButton.module.sass'
import { classes } from "utils"

const ColorButton = ({
                       id = false,
                       color = '',
                       active = false,
                       title = '',
                       onClick
                     }) =>
  <li
    style={{ background: color }}
    className={classes(
      styles.btn,
      active && styles.active,
      color === 'all' && styles.btnAllColor,
    )}
    onClick={() => onClick(id)}
  />

export default ColorButton