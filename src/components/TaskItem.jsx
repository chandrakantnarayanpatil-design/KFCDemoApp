import React, { useState } from 'react'

export default function TaskItem({ task, toggleComplete, deleteTodo, editTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(task.text)

  const handleSave = () => {
    if (draft.trim()) {
      editTodo(task.id, draft.trim())
      setIsEditing(false)
    }
  }

  return (
    <li className="bg-white/70 p-3 rounded flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <input
          id={`cb-${task.id}`}
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
          aria-label={`Mark ${task.text} as ${task.completed ? 'incomplete' : 'complete'}`}
        />

        <div>
          {isEditing ? (
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              className="border rounded px-2 py-1"
              aria-label="Edit task"
            />
          ) : (
            <label htmlFor={`cb-${task.id}`} className={`${task.completed ? 'task-completed' : ''}`}>{task.text}</label>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="text-sm text-indigo-600">Save</button>
            <button onClick={() => { setIsEditing(false); setDraft(task.text) }} className="text-sm">Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="text-sm text-indigo-600">Edit</button>
            <button onClick={() => deleteTodo(task.id)} className="text-sm text-red-500">Delete</button>
          </>
        )}
      </div>
    </li>
  )
}
