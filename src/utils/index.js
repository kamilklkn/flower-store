import { normalize, schema } from "normalizr"

export function getNameById(id, names) {
  const item = names.find(item => item.id === id)
  return item.name || ''
}

export function classes() {
  const [...args] = arguments
  return args.reduce((total, arg) => arg ? total + ' ' + arg : total)
}

export const normalizeObjects = (entitiesName, items) => {
  const entitiesSchema = new schema.Entity(entitiesName)
  const listSchema = [entitiesSchema]
  return normalize(items, listSchema)
}


const mounts = 'января,февраля,марта,апреля,мая,июня,июля,августа,сентября,октября,ноября,декабря'

export function getAvailableDate(date) {
  return date.getDate() + ' ' + mounts.split(',')[date.getMonth()]
}

export const getObjectWithoutKeys = (object, keysToRemove) => {
  return Object.entries(object).reduce((results, item) => {
    const [key, value] = item

    return keysToRemove.includes(key) ?
      { ...results } :
      { ...results, [key]: value }
  }, {})
}