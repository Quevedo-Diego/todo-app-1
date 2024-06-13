import React from 'react';

const TodoItem = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <div className="todo-item d-flex justify-content-between align-items-center p-2 border-bottom">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleComplete(todo.id)}
        className="form-check-input"
      />
      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
        {todo.title}
      </span>
      <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">
        Borrar
      </button>
    </div>
  );
};

export default TodoItem;
