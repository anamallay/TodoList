import { v4 as uuidv4 } from "uuid";

export function TodosReducer(currentTodo, action) {
  switch (action.type) {
    case "add": {
      let newTask = {
        id: uuidv4(),
        title: action.payload.title,
        body: "",
        isCompleted: false,
      };

      const updatedTodos = [...currentTodo, newTask];

      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      let updateTodos = currentTodo.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todo", JSON.stringify(updateTodos));
      return updateTodos;
    }
    case "update": {
      let updatedTodos = currentTodo.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.titleEdit.title,
            body: action.payload.titleEdit.body,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "get": {
      let storageTodos = JSON.parse(localStorage.getItem("todo")) ?? [];
      return storageTodos;
    }
    case "isDone": {
      let updatedTodos = currentTodo.map((t) => {
        if (t.id === action.payload.todo.id) {
          const updatedTodo = {
            ...t,
            isCompleted: !t.isCompleted,
          };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todo", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    default: {
      throw new Error("UnKnown action: " + action.type);
    }
  }
}
