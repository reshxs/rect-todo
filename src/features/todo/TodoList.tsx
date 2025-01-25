import React, { useState, useEffect } from "react";
import { Todo } from "./types";
import { getTodos, saveTodos } from "./todoService";
import TodoItem from "./TodoItem";
import { TextField, Button, Paper, Typography } from "@mui/material";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    setTodos(getTodos());
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) return;

    const newTask: Todo = {
      id: crypto.randomUUID(),
      title: newTodo.trim(),
      completed: false,
    };

    const updatedTodos = [...todos, newTask];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
    setNewTodo("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      addTodo();
    }
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  return (
    <Paper
      elevation={3}
      style={{ padding: "16px", maxWidth: "500px", margin: "40px auto" }}
    >
      <Typography variant="h4" gutterBottom>
        Todo List
      </Typography>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <TextField
          fullWidth
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKeyDown} // Обработка Enter
          label="Add a new task..."
          variant="outlined"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTodo}
          style={{ whiteSpace: "nowrap" }}
        >
          Add
        </Button>
      </div>
      <div>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        ) : (
          <Typography color="textSecondary">
            No tasks yet. Add a new one!
          </Typography>
        )}
      </div>
    </Paper>
  );
};

export default TodoList;
