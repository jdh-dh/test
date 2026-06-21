const FILTERS = [
  { key: 'all', label: '전체' },
  { key: 'active', label: '진행중' },
  { key: 'completed', label: '완료' },
]

export default function TodoFilter({ filter, onChange, counts }) {
  return (
    <div className="todo-filter">
      {FILTERS.map(({ key, label }) => (
        <button
          key={key}
          className={`filter-btn${filter === key ? ' active' : ''}`}
          onClick={() => onChange(key)}
        >
          {label}
          <span className="count">{counts[key]}</span>
        </button>
      ))}
    </div>
  )
}
