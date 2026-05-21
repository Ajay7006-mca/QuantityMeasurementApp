import { useCallback, useState } from 'react'

export function useAsyncAction(action) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = useCallback(
    async (...args) => {
      setLoading(true)
      setError('')

      try {
        return await action(...args)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong.'
        setError(message)
        return null
      } finally {
        setLoading(false)
      }
    },
    [action],
  )

  return { run, loading, error, setError }
}
