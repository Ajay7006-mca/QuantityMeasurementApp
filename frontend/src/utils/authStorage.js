export const TOKEN_STORAGE_KEY = 'token'
export const USER_STORAGE_KEY = 'auth_user'
export const AUTH_EVENT_UNAUTHORIZED = 'auth:unauthorized'

export const parseJwtPayload = (token) => {
  try {
    const payload = token.split('.')[1]
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const decoded = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )

    return JSON.parse(decoded)
  } catch {
    return null
  }
}

export const isTokenExpired = (token) => {
  const payload = parseJwtPayload(token)
  if (!payload?.exp) return false

  return payload.exp * 1000 <= Date.now()
}

export const readStoredUser = () => {
  try {
    const rawUser = localStorage.getItem(USER_STORAGE_KEY)
    return rawUser ? JSON.parse(rawUser) : null
  } catch {
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

export const readStoredToken = () => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token && isTokenExpired(token)) {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    return null
  }

  return token
}

export const buildUserFromToken = (token) => {
  const payload = parseJwtPayload(token)
  if (!payload) return null

  return {
    email: payload.email || payload.sub,
    name: payload.name || payload.sub,
  }
}

export const notifyUnauthorized = () => {
  window.dispatchEvent(new Event(AUTH_EVENT_UNAUTHORIZED))
}
