import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { fetchOAuthSuccess } from '../services/api'

const readHashParams = (hash) => new URLSearchParams(hash.startsWith('#') ? hash.slice(1) : hash)

function LoginSuccess() {
  const [searchParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { saveAuth } = useAuth()
  const [status, setStatus] = useState('Completing Google login...')
  const [error, setError] = useState('')

  const hashParams = useMemo(() => readHashParams(location.hash), [location.hash])

  const finishLogin = useCallback(async ({ updateStatus = true } = {}) => {
    if (updateStatus) {
      setError('')
      setStatus('Completing Google login...')
    }

    const token =
      searchParams.get('token') ||
      searchParams.get('jwt') ||
      searchParams.get('access_token') ||
      hashParams.get('token') ||
      hashParams.get('jwt') ||
      hashParams.get('access_token')

    if (token) {
      saveAuth(token, {
        email: searchParams.get('email') || hashParams.get('email') || undefined,
        name: searchParams.get('name') || hashParams.get('name') || undefined,
        picture: searchParams.get('picture') || hashParams.get('picture') || undefined,
      })
      navigate('/home', { replace: true })
      return
    }

    const response = await fetchOAuthSuccess()
    const jwt = response.jwt || response.token || response.accessToken

    if (!jwt) {
      throw new Error('Login completed, but no JWT token was returned by the backend.')
    }

    saveAuth(jwt, {
      email: response.email,
      name: response.name,
      picture: response.picture,
    })
    navigate('/home', { replace: true })
  }, [hashParams, navigate, saveAuth, searchParams])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      finishLogin({ updateStatus: false }).catch((err) => {
        setStatus('')
        setError(err instanceof Error ? err.message : 'Unable to complete login.')
      })
    }, 0)

    return () => window.clearTimeout(timeoutId)
  }, [finishLogin])

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-wide text-cyan-700">Google OAuth</p>
        <h1 className="mt-2 text-3xl font-black text-slate-950">Login status</h1>
        {status ? <p className="mt-4 text-slate-600">{status}</p> : null}
        {error ? (
          <div className="mt-5 rounded-lg bg-rose-50 p-4 text-left text-sm font-medium text-rose-700">
            {error}
          </div>
        ) : null}
        <div className="mt-6 flex justify-center gap-3">
          {error ? <Button onClick={finishLogin}>Try again</Button> : null}
          <Link to="/">
            <Button variant="secondary">Go home</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default LoginSuccess
