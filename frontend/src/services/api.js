import { OPERATION_ENDPOINTS } from '../utils/measurements'
import { TOKEN_STORAGE_KEY, notifyUnauthorized } from '../utils/authStorage'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const ENDPOINTS = {
  quantityBase: '/api/v1/quantities',
  authSuccess: '/api/auth/success',
  convert: '/convert',
  compare: '/compare',
  history: '/history',
  operations: OPERATION_ENDPOINTS,
}

const makeUrl = (path) => `${API_BASE_URL}${ENDPOINTS.quantityBase}${path}`
const makeAuthUrl = (path) => `${API_BASE_URL}${path}`

const getToken = () => localStorage.getItem(TOKEN_STORAGE_KEY)

const authHeaders = () => {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const extractErrorMessage = (payload, fallback) =>
  payload?.message || payload?.errorMessage || payload?.error || fallback

async function request(path, options = {}) {
  const response = await fetch(makeUrl(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options.headers,
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    if (response.status === 401) {
      notifyUnauthorized()
    }
    throw new Error(extractErrorMessage(payload, 'The backend rejected the request.'))
  }

  if (payload?.error) {
    throw new Error(payload.errorMessage || 'The backend returned an operation error.')
  }

  return payload
}

async function authRequest(path, options = {}) {
  const response = await fetch(makeAuthUrl(path), {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...options.headers,
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const payload = contentType.includes('application/json') ? await response.json() : await response.text()

  if (!response.ok) {
    if (response.status === 401) {
      notifyUnauthorized()
    }
    throw new Error(extractErrorMessage(payload, 'Unable to complete Google login.'))
  }

  return payload
}

export const convertUnits = ({ quantity, targetUnit }) =>
  request(ENDPOINTS.convert, {
    method: 'POST',
    body: JSON.stringify({
      thisQuantityDTO: quantity,
      thatQuantityDTO: {
        ...quantity,
        unit: targetUnit,
      },
      targetUnit,
    }),
  })

export const calculateUnits = ({ leftQuantity, rightQuantity, operation, targetUnit }) => {
  const endpoint = ENDPOINTS.operations[operation]
  if (!endpoint) {
    throw new Error('Unsupported calculator operation.')
  }

  return request(`/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify({
      thisQuantityDTO: leftQuantity,
      thatQuantityDTO: rightQuantity,
      targetUnit,
    }),
  })
}

export const compareUnits = async ({ leftQuantity, rightQuantity }) => {
  const equalityResult = await request(ENDPOINTS.compare, {
    method: 'POST',
    body: JSON.stringify({
      thisQuantityDTO: leftQuantity,
      thatQuantityDTO: rightQuantity,
    }),
  })

  if (Number(equalityResult.value) === 1) {
    return {
      ...equalityResult,
      relation: '=',
      convertedRightValue: leftQuantity.value,
      convertedRightUnit: leftQuantity.unit,
    }
  }

  const convertedRight = await convertUnits({
    quantity: rightQuantity,
    targetUnit: leftQuantity.unit,
  })

  return {
    ...equalityResult,
    relation: leftQuantity.value > convertedRight.value ? '>' : '<',
    convertedRightValue: convertedRight.value,
    convertedRightUnit: convertedRight.unit,
  }
}

export const getBackendHistory = () => request(ENDPOINTS.history)

export const clearBackendHistory = () =>
  request(ENDPOINTS.history, {
    method: 'DELETE',
  })

export const fetchOAuthSuccess = () => authRequest(ENDPOINTS.authSuccess)

// Update ENDPOINTS above if the Spring controller paths change. UI code should
// call only the named functions exported from this file.
