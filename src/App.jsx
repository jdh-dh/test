import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'
import TodoFilter from './components/TodoFilter'

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 }

function loadTodos() {
  try {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export default function App() {
  const [todos, setTodos] = useState(loadTodos)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  function addTodo(title, priority, dueDate) {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        completed: false,
        priority,
        dueDate: dueDate || null,
        createdAt: Date.now(),
      },
    ])
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function toggleTodo(id) {
    setTodos(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  const filtered = todos
    .filter(t => {
      if (filter === 'active') return !t.completed
      if (filter === 'completed') return t.completed
      return true
    })
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])

  const counts = {
    all: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>✅ 투두리스트</h1>
      </header>
      <main className="app-main">
        <TodoForm onAdd={addTodo} />
        <TodoFilter filter={filter} onChange={setFilter} counts={counts} />
        {filtered.length === 0 ? (
          <p className="empty-msg">할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {filtered.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
