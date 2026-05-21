function UnitSelector({ label, options, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <select
        className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-slate-900 shadow-sm outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value ?? option.id} value={option.value ?? option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default UnitSelector
