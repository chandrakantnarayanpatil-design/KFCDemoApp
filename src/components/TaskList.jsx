import React from 'react'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, toggleComplete, deleteTodo, editTodo }) {
  if (!tasks || tasks.length === 0) {
    return <p className="text-sm text-gray-600 mt-4">No tasks to show.</p>
  }

  return (
    <ul className="mt-4 space-y-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
      ))}
    </ul>
  )
}
