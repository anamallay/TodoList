import { createContext, useContext } from "react";
import { useState } from "react";
import SnakeBar from "../components/SnakeBar";



export const ToasterContext = createContext();

export const ToasterProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
  function showHideToast(messageparams) {
    setOpen(true);
    setMessage(messageparams);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }
  return (
    <ToasterContext.Provider value={{ showHideToast }}>
      <SnakeBar open={open} message={message} />
      {children}
    </ToasterContext.Provider>
  );
}

export const useToaster = () => {
    return useContext(ToasterContext);
}