import React from 'react'
import styles from './Available.module.sass'
import { getAvailableDate } from "utils/date";


const Available = ({ now = true, fromDate = false }) => {
  const cls = [styles.available]
  !now && fromDate && cls.push(styles.no)
  return (
    <p className={cls.join(' ')}>
      {now && (
        'В наличии'
      )}
      {!now && fromDate && (
        <>Доступно с <b>{getAvailableDate(fromDate)}</b></>
      )}
    </p>
  )
}

export default Available

