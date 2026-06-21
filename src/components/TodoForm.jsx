import { useState } from 'react'

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    onAdd(trimmed, priority, dueDate)
    setTitle('')
    setPriority('medium')
    setDueDate('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <div className="form-row">
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option value="high">🔴 높음</option>
          <option value="medium">🟡 중간</option>
          <option value="low">🔵 낮음</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button type="submit" className="btn-add">추가</button>
      </div>
    </form>
  )
}
