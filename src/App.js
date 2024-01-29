import TodoList from "./components/TodoList.js";
import * as React from "react";
import { ToasterProvider } from "./contexts/toasterContext.js";
import { TodosProvider } from "./contexts/todoContext.js";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#191b1f",
        height: "100vh",
      }}>
      <TodosProvider>
        <ToasterProvider>
          <TodoList />
        </ToasterProvider>
      </TodosProvider>
    </div>
  );
}

export default App;
