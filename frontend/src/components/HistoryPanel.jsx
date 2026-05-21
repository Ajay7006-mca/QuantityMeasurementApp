function HistoryPanel({ title, items, emptyText, onClear, renderItem }) {
  return (
    <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-900">{title}</h2>
        {items.length > 0 ? (
          <button
            className="text-sm font-semibold text-slate-500 transition hover:text-rose-600"
            type="button"
            onClick={onClear}
          >
            Clear
          </button>
        ) : null}
      </div>
      {items.length === 0 ? (
        <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">{emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-700">
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default HistoryPanel
