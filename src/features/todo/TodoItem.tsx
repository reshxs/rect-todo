import React from "react";
import { Todo } from "./types";
import { Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        color="primary"
      />
      <Typography
        variant="body1"
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          flexGrow: 1,
        }}
      >
        {todo.title}
      </Typography>
      <IconButton color="secondary" onClick={() => onDelete(todo.id)}>
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default TodoItem;
