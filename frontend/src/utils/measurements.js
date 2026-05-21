export const MEASUREMENT_TYPES = [
  { id: 'LENGTH', label: 'Length' },
  { id: 'WEIGHT', label: 'Weight' },
  { id: 'TEMPERATURE', label: 'Temperature' },
  { id: 'VOLUME', label: 'Volume' },
]

export const UNITS_BY_TYPE = {
  LENGTH: [
    { value: 'FEET', label: 'Feet' },
    { value: 'INCH', label: 'Inch' },
    { value: 'YARDS', label: 'Yards' },
    { value: 'CENTIMETERS', label: 'Centimeters' },
  ],
  WEIGHT: [
    { value: 'KILOGRAM', label: 'Kilogram' },
    { value: 'GRAM', label: 'Gram' },
    { value: 'POUND', label: 'Pound' },
  ],
  TEMPERATURE: [
    { value: 'CELSIUS', label: 'Celsius' },
    { value: 'FAHRENHEIT', label: 'Fahrenheit' },
    { value: 'KELVIN', label: 'Kelvin' },
  ],
  VOLUME: [
    { value: 'LITRE', label: 'Litre' },
    { value: 'MILLILITRE', label: 'Millilitre' },
    { value: 'GALLON', label: 'Gallon' },
  ],
}

export const OPERATION_ENDPOINTS = {
  add: 'add',
  subtract: 'subtract',
  multiply: 'multiply',
  divide: 'divide',
}

export const OPERATORS = [
  { value: 'add', symbol: '+', label: 'Add' },
  { value: 'subtract', symbol: '-', label: 'Subtract' },
  { value: 'multiply', symbol: 'x', label: 'Multiply' },
  { value: 'divide', symbol: '/', label: 'Divide' },
]

export const defaultUnitFor = (measurementType) => UNITS_BY_TYPE[measurementType]?.[0]?.value ?? ''

export const getUnitLabel = (measurementType, unit) =>
  UNITS_BY_TYPE[measurementType]?.find((item) => item.value === unit)?.label ?? unit

export const getTypeLabel = (measurementType) =>
  MEASUREMENT_TYPES.find((type) => type.id === measurementType)?.label ?? measurementType
