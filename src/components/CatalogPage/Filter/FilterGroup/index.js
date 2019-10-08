import React from "react"
import styles from './FilterGroup.module.sass';


const FilterGroup = ({
                       filterKey,
                       title,
                       items,
                       selected,
                       onClickItem
                     }) => (
  <div>
    <p>{title}</p>
    <ul>
      {
        items.map(item =>
          <li
            className={`${styles.item} ${selected.includes(item.id) && styles.active}`}
            key={item.id}
            onClick={() => onClickItem(filterKey, item.id)}
          >
            {item.name}
            {}
          </li>
        )
      }
    </ul>
  </div>
)

export default FilterGroup