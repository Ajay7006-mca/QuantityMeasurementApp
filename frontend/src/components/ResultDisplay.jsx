function ResultDisplay({ title = 'Result', result, tone = 'neutral', icon: Icon, children }) {
  const tones = {
    neutral: 'border-cyan-100 bg-cyan-50 text-cyan-900',
    success: 'border-emerald-100 bg-emerald-50 text-emerald-900',
    warning: 'border-amber-100 bg-amber-50 text-amber-900',
    danger: 'border-rose-100 bg-rose-50 text-rose-900',
  }

  return (
    <section className={`rounded-lg border p-5 shadow-sm transition ${tones[tone]}`}>
      <p className="text-sm font-semibold uppercase tracking-wide opacity-75">{title}</p>
      <div className="mt-2 flex items-center gap-3 text-2xl font-bold">
        {Icon ? <Icon className="h-7 w-7 shrink-0" /> : null}
        <span>{result || 'No result yet'}</span>
      </div>
      {children ? <div className="mt-3 text-sm opacity-80">{children}</div> : null}
    </section>
  )
}

export default ResultDisplay
