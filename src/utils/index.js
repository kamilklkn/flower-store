export function getNameById(id, names) {
  const item = names.find(item => item.id === id)
  return item.name || ''
}

export function classes() {
  const [...args] = arguments
  return args.reduce((total, arg) => arg ? total + ' ' + arg : total)
}