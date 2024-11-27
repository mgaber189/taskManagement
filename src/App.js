import { useEffect, useRef, useState } from "react";
import { socket } from "./socket";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  selectTodos,
} from "./redux/slice/todosSlice";
import TaskWrapper from "./components/TaskWrapper";

function App() {
  const todos = useSelector(selectTodos);
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const isSocketInitialized = useRef(false); 
  useEffect(() => {
    const handleConnect = () => {
      if (!isSocketInitialized.current) {
        socket.emit("getTodos"); 
        isSocketInitialized.current = true; 
      }
      setIsConnected(true);
    };
  
    const handleDisconnect = () => {
      setIsConnected(false);
    };
  
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
  
    socket.on("todosData", (data) => {
      dispatch(setTodos(data)); 
    });
  
    socket.on("todoAdded", (newTodo) => {
      dispatch(addTodo(newTodo));
    });
  
    socket.on("todoDeleted", (todoId) => {
      
      dispatch(deleteTodo(todoId));
    });
  
    socket.on("todoUpdated", (updatedTodo) => {
      dispatch(updateTodo(updatedTodo)); 
    });
  
    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("todosData");
      socket.off("todoAdded");
      socket.off("todoDeleted");
      socket.off("todoUpdated");
      isSocketInitialized.current = false;
    };
  }, [dispatch]);
  

  return (
    <div className="App">
      <TaskWrapper />
    </div>
  );
}

export default App;
