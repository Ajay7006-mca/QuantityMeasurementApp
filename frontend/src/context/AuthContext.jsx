import { useCallback, useEffect, useMemo, useState } from 'react'
import { API_BASE_URL } from '../services/api'
import {
  AUTH_EVENT_UNAUTHORIZED,
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
  buildUserFromToken,
  parseJwtPayload,
  readStoredToken,
  readStoredUser,
} from '../utils/authStorage'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStoredToken())
  const [user, setUser] = useState(() => readStoredUser())

  const clearAuth = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE_KEY)
    setToken(null)
    setUser(null)
  }, [])

  const logout = useCallback(() => {
    clearAuth()
  }, [clearAuth])

  const saveAuth = useCallback((nextToken, nextUser = null) => {
    const tokenUser = buildUserFromToken(nextToken)
    const mergedUser = nextUser ? { ...tokenUser, ...nextUser } : tokenUser

    localStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    if (mergedUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(mergedUser))
    } else {
      localStorage.removeItem(USER_STORAGE_KEY)
    }

    setToken(nextToken)
    setUser(mergedUser)
  }, [])

  const login = useCallback(() => {
    window.location.assign(`${API_BASE_URL}/oauth2/authorization/google`)
  }, [])

  useEffect(() => {
    if (!token) return

    const payload = parseJwtPayload(token)
    if (!payload?.exp) return

    const timeoutId = window.setTimeout(clearAuth, Math.max(payload.exp * 1000 - Date.now(), 0))
    return () => window.clearTimeout(timeoutId)
  }, [clearAuth, token])

  useEffect(() => {
    const handleUnauthorized = () => clearAuth()
    window.addEventListener(AUTH_EVENT_UNAUTHORIZED, handleUnauthorized)
    return () => window.removeEventListener(AUTH_EVENT_UNAUTHORIZED, handleUnauthorized)
  }, [clearAuth])

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
      saveAuth,
    }),
    [login, logout, saveAuth, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
