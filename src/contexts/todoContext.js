import { createContext, useReducer, useContext } from "react";
import { TodosReducer } from "../reducer/todosReducer";

export const TodoContext = createContext([]);

export const TodosProvider = ({ children }) => {
  const [todos, todosDispatch] = useReducer(TodosReducer, []);
  return (
    <TodoContext.Provider value={{ todo: todos, dispatch: todosDispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodoContext);
};