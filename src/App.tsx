import React from "react";
import TodoList from "./features/todo/TodoList";
import { CssBaseline, Container } from "@mui/material";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <TodoList />
      </Container>
    </>
  );
};

export default App;
