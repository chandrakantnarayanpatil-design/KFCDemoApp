import React, { useState, useEffect, useRef } from 'react'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

// Common tasks used by the AI suggestion feature
const COMMON_TASKS = [
  'Buy groceries',
  'Call dentist',
  'Pay bills',
  'Exercise',
  'Study React',
  'Team meeting',
  'Doctor appointment'
]

export default function App() {
  // todos: array of task objects {id, text, completed}
  const [todos, setTodos] = useState([])
  // inputValue: controlled input for new or edited task
  const [inputValue, setInputValue] = useState('')
  // suggestions: AI-powered suggestions filtered from COMMON_TASKS
  const [suggestions, setSuggestions] = useState([])
  // filter: 'all' | 'completed' | 'pending'
  const [filter, setFilter] = useState('all')

  const inputRef = useRef(null)

  // useEffect: update suggestions whenever inputValue changes
  // dependency: [inputValue]
  useEffect(() => {
    const q = inputValue.trim().toLowerCase()
    if (q.length > 3) {
      const matches = COMMON_TASKS.filter((t) =>
        t.toLowerCase().includes(q)
      )
      setSuggestions(matches)
    } else {
      setSuggestions([])
    }
  }, [inputValue])

  // Add new todo
  const addTodo = (text) => {
    if (!text.trim()) return
    const newTodo = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      text: text.trim(),
      completed: false
    }
    setTodos((s) => [newTodo, ...s])
    setInputValue('')
    setSuggestions([])
    inputRef.current?.focus()
  }

  // Toggle completed
  const toggleComplete = (id) => {
    setTodos((s) => s.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  // Delete
  const deleteTodo = (id) => {
    setTodos((s) => s.filter(t => t.id !== id))
  }

  // Edit
  const editTodo = (id, newText) => {
    setTodos((s) => s.map(t => t.id === id ? { ...t, text: newText } : t))
  }

  // Filtered tasks
  const filtered = todos.filter((t) => {
    if (filter === 'completed') return t.completed
    if (filter === 'pending') return !t.completed
    return true
  })

  // Stats
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const pending = total - completed

  return (
    <div className="min-h-screen flex items-start py-12">
      <div className="container-card w-full">
        <div className="card">
          <h1 className="text-2xl font-semibold mb-2">Task Manager</h1>
          <p className="text-sm text-gray-600 mb-4">Manage your tasks with helpful AI suggestions.</p>

          <TaskInput
            inputValue={inputValue}
            setInputValue={setInputValue}
            addTodo={addTodo}
            suggestions={suggestions}
            setInputRef={el => (inputRef.current = el)}
            onSuggestionClick={(s) => setInputValue(s)}
          />

          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-2" role="tablist" aria-label="Filters">
              <button onClick={() => setFilter('all')} className={`px-3 py-1 rounded ${filter==='all'?'bg-indigo-600 text-white':'bg-white/60'}`}>All</button>
              <button onClick={() => setFilter('completed')} className={`px-3 py-1 rounded ${filter==='completed'?'bg-indigo-600 text-white':'bg-white/60'}`}>Completed</button>
              <button onClick={() => setFilter('pending')} className={`px-3 py-1 rounded ${filter==='pending'?'bg-indigo-600 text-white':'bg-white/60'}`}>Pending</button>
            </div>

            <div className="text-sm text-gray-700">
              <strong>Total:</strong> {total} &nbsp; <strong>Done:</strong> {completed} &nbsp; <strong>Pending:</strong> {pending}
            </div>
          </div>

          <TaskList
            tasks={filtered}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </div>
  )
}
