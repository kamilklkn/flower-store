import React from 'react'
import styles from './Button.module.sass'
import { classes } from "utils"

const Button = ({ id, title, active, onClick }) =>
  <li
    className={classes(
      styles.btn,
      active && styles.active
    )}
    onClick={onClick}
  >
    {title}
  </li>


export default Button