export const formatNumber = (value) => {
  if (value === null || value === undefined || value === '') return ''
  const number = Number(value)
  if (!Number.isFinite(number)) return String(value)

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 6,
  }).format(number)
}

export const formatDateTime = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
