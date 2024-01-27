import TodoList from "./components/TodoList.js";
import * as React from "react";
import { v4 as uuidv4 } from "uuid";

import { useState } from "react";
import { TodoContext } from "./contexts/todoContext.js";
let initialtodo = [
  {
    id: uuidv4(),
    title: "title 1 tasks",
    body: "body 1 tasks",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "title 2 tasks",
    body: "body 2 tasks",
    isCompleted: false,
  },
];


function App() {
  const [todo, setTodo] = useState(initialtodo);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191b1f",
        height: "100vh",
      }}>
      <TodoContext.Provider value={{ todo, setTodo }}>
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
