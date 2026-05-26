import React, { useState } from "react";
import "./TodoList.css";

function TodoList() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (input.trim() === "") return;

    setTodos([{ id: Date.now(), text: input.trim(), completed: false }, ...todos]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "done") return todo.completed;
    return true;
  });

  return (
    <div className="todo-app">
      <div className="todo-app__card">
        <header className="todo-app__header">
          <h1 className="todo-app__title">Tasks</h1>
          <p className="todo-app__subtitle">
            {todos.length === 0
              ? "Nothing here yet."
              : `${pendingCount} remaining, ${completedCount} completed`}
          </p>
        </header>

        <div className="todo-app__form">
          <input
            type="text"
            className="todo-app__input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
          />
          <button type="button" className="todo-app__add-btn" onClick={addTodo}>
            + Add
          </button>
        </div>

        {todos.length > 0 && (
          <div className="todo-app__filters">
            {[
              { key: "all", label: "All" },
              { key: "active", label: "Active" },
              { key: "done", label: "Done" },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`todo-app__filter${
                  filter === key ? " todo-app__filter--active" : ""
                }`}
              >
                {label}
              </button>
            ))}
            {completedCount > 0 && (
              <button
                type="button"
                className="todo-app__clear"
                onClick={clearCompleted}
              >
                Clear done
              </button>
            )}
          </div>
        )}

        {todos.length === 0 ? (
          <div className="todo-app__empty">
            <div className="todo-app__empty-icon">✓</div>
            <p className="todo-app__empty-title">No tasks yet</p>
            <p className="todo-app__empty-text">
              Type above and press Enter to add one.
            </p>
          </div>
        ) : (
          <div className="todo-app__scroll">
            <ul className="todo-app__list">
              {filteredTodos.length === 0 ? (
                <li className="todo-app__empty-filter">No tasks in this view.</li>
              ) : (
                filteredTodos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`todo-app__item${
                      todo.completed ? " todo-app__item--done" : ""
                    }`}
                  >
                    <button
                      type="button"
                      className={`todo-app__check${
                        todo.completed ? " todo-app__check--done" : ""
                      }`}
                      onClick={() => toggleTodo(todo.id)}
                      aria-label={
                        todo.completed ? "Mark incomplete" : "Mark complete"
                      }
                    >
                      {todo.completed ? "✓" : ""}
                    </button>

                    <span className="todo-app__text">{todo.text}</span>

                    <button
                      type="button"
                      className="todo-app__delete"
                      onClick={() => deleteTodo(todo.id)}
                      aria-label={`Delete ${todo.text}`}
                    >
                      ×
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default TodoList;
