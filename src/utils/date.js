const mounts = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

export function getAvailableDate(date) {
  return date.getDay() + ' ' + mounts[date.getMonth()]
}