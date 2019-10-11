export function getNameById(id, names) {
  const item = names.find(item => item.id === id)
  return item.name || ''
}
