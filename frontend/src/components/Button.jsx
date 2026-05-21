function Button({ children, className = '', variant = 'primary', loading = false, disabled = false, ...props }) {
  const variants = {
    primary: 'bg-cyan-600 text-white hover:bg-cyan-700 focus:ring-cyan-500',
    secondary: 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100 focus:ring-cyan-500',
    danger: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200 hover:bg-rose-100 focus:ring-rose-400',
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? 'Working...' : children}
    </button>
  )
}

export default Button
