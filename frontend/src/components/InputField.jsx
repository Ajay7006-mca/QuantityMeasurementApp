function InputField({ label, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
        {...props}
      />
      {error ? <span className="mt-2 block text-sm text-rose-600">{error}</span> : null}
    </label>
  )
}

export default InputField
