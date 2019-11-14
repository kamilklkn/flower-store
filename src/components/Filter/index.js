import React from 'react'
import { filtersEntities } from 'utils/filtersEntities'
import ButtonsGroupCollapseContainer from "containers/buttonsGroupCollapse"
import styles from "components/Filter/Filter.module.sass"


const Filter = () => (
  <div className={styles.filter}>
    {
      // Более функциональный стиль, чем с Object.keys
      // Потому что, мы будем не из нутри обращаться к this.props.filter[key]
      Object.entries(filtersEntities)
      // .sort((a, b) => a[1].order > b[1].order ? 1 : -1)
        .map(item => {
          const [filterKey, filter] = item
          return (
            <ButtonsGroupCollapseContainer
              key={filterKey}
              filterType={filter.type}
              filterKey={filterKey}
              title={filter.title}
              isOpened={filter.openedDefault}
            />
          )
        })
    }
  </div>
)

export default Filter