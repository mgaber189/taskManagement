import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilterTodos,
  selectTodos,
  setEditTodo,
} from "../redux/slice/todosSlice";
import { socket } from "../socket";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
const TodoList = () => {
  const todos = useSelector(selectTodos);
  const filteredTodos = useSelector(selectFilterTodos);
  const dispatch = useDispatch();
  const deleteTodoHandler = (todoId) => {
    socket.emit("deleteTodo", todoId);
  };

  const updateTodoHandler = (todoId, updatedData) => {
    socket.emit("updateTodo", todoId, updatedData);
  };

  return (
    <>
      {todos?.length === 0 ? (
        <p className="text-center text-white text-lg mt-5">No todos found</p>
      ) : filteredTodos?.length === 0 ? (
        <p className="text-center text-white text-lg mt-5">No todos found</p>
      ) : (
        <ul className="w-full mt-10 mx-auto">
          {(filteredTodos?.length > 0 ? filteredTodos : todos)?.map(
            (todo, index) => (
              <li
                key={index}
                className="flex flex-col md:flex-row items-center md:space-x-4 mb-4">
                <div className="flex items-center justify-center w-full md:w-1/12 mb-2 md:mb-0">
                  {todo?.completed ? (
                    <BsCheckCircleFill
                      onClick={() =>
                        updateTodoHandler(todo?.id, {
                          completed: !todo?.completed,
                        })
                      }
                      className="cursor-pointer"
                      color="#1FAF38"
                      size={30}
                    />
                  ) : (
                    <TiDelete
                      onClick={() =>
                        updateTodoHandler(todo?.id, {
                          completed: !todo?.completed,
                        })
                      }
                      className="cursor-pointer"
                      color="#BF0404"
                      size={40}
                    />
                  )}
                </div>
                <div className="text-lg md:text-2xl text-white flex items-center justify-between w-full md:w-11/12 bg-[#F2B138] rounded-xl p-3 md:p-5">
                  <p className="w-10/12 text-left mx-3 md:mx-5 truncate">
                    {todo?.todo}
                  </p>
                  <div className="flex space-x-2 md:space-x-4">
                    <button onClick={() => dispatch(setEditTodo(todo))}>
                      <FaRegEdit className="text-xl md:text-2xl" />
                    </button>
                    <button onClick={() => deleteTodoHandler(todo?.id)}>
                      <MdDelete className="text-xl md:text-2xl" />
                    </button>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </>
  );
};
export default TodoList;
