export const parseQuantityValue = (value, fieldName = 'Value') => {
  if (value === '') {
    return { error: `${fieldName} is required.` }
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed)) {
    return { error: `${fieldName} must be a valid number.` }
  }

  return { value: parsed }
}

export const buildQuantityDTO = ({ value, unit, measurementType }) => ({
  value,
  unit,
  measurementType,
})
