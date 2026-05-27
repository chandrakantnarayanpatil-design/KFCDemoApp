import React, { useRef, useEffect } from 'react'

export default function TaskInput({ inputValue, setInputValue, addTodo, suggestions, setInputRef, onSuggestionClick }) {
  const localRef = useRef(null)

  // expose input ref to parent when mounted
  useEffect(() => {
    if (setInputRef) setInputRef(localRef.current)
  }, [setInputRef])

  // handle Enter key to add task
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo(inputValue)
    }
  }

  return (
    <div>
      <label htmlFor="task-input" className="sr-only">New task</label>
      <input
        id="task-input"
        ref={localRef}
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="What needs to be done? AI will help!"
        aria-label="Task input"
        className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-300"
      />

      {/* Suggestions dropdown */}
      {suggestions && suggestions.length > 0 && (
        <ul className="suggestions mt-1" role="listbox" aria-label="Suggestions">
          {suggestions.map((s, idx) => (
            <li
              key={s + idx}
              role="option"
              aria-selected={false}
              tabIndex={0}
              onClick={() => onSuggestionClick(s)}
              onKeyPress={(e) => e.key === 'Enter' && onSuggestionClick(s)}
              className="suggestion-item px-3 py-2 cursor-pointer"
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex justify-end">
        <button
          onClick={() => addTodo(inputValue)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          aria-label="Add task"
        >
          Add
        </button>
      </div>
    </div>
  )
}
