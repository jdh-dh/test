const PRIORITY_LABEL = { high: '높음', medium: '중간', low: '낮음' }

function isOverdue(dueDate) {
  if (!dueDate) return false
  return new Date(dueDate) < new Date(new Date().toDateString())
}

export default function TodoItem({ todo, onToggle, onDelete }) {
  const { id, title, completed, priority, dueDate } = todo

  return (
    <li className={`todo-item${completed ? ' completed' : ''}`}>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => onToggle(id)}
      />
      <div className="todo-content">
        <span className="todo-title">{title}</span>
        <div className="todo-meta">
          <span className={`priority-badge ${priority}`}>
            {PRIORITY_LABEL[priority]}
          </span>
          {dueDate && (
            <span className={`due-date${isOverdue(dueDate) ? ' overdue' : ''}`}>
              📅 {dueDate}{isOverdue(dueDate) && !completed ? ' 기한 초과' : ''}
            </span>
          )}
        </div>
      </div>
      <button className="btn-delete" onClick={() => onDelete(id)} title="삭제">
        ✕
      </button>
    </li>
  )
}
