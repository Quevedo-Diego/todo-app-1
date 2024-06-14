import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
  
    if (todos.length === 0) {
      axios.get('https://jsonplaceholder.typicode.com/todos')
        .then(response => {
          setTodos(response.data.slice(0, 10)); //10 tareas para simplificar
        });
    }
  }, []);

  // Guardar las tareas en el localStorage cuando se actualicen
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title, completed: false };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo =>
    filter === 'all' ? true : filter === 'completed' ? todo.completed : !todo.completed
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Tareas</h1>
      <input
        type="text"
        placeholder="Nueva tarea"
        className="form-control mb-3"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            addTodo(e.target.value);
            e.target.value = '';
          }
        }}
      />
      <div className="btn-group mb-3">
        <button className="btn btn-primary" onClick={() => setFilter('all')}>Todas las tareas</button>
        <button className="btn btn-primary" onClick={() => setFilter('completed')}>Completadas</button>
        <button className="btn btn-primary" onClick={() => setFilter('incomplete')}>Incompletas</button>
      </div>
      <div className="list-group">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

