import React from "react";
import TaskForm from "./TaskForm";
import TodoList from "./TodoList";
import FilterTasks from "./FilterTasks";
const TaskWrapper = () => {
  return (
    <>
      <div
        style={{
          background: "linear-gradient(180deg, #604006 6.61%, #000 93.39%)",
        }}
        className="w-full md:w-10/12 lg:w-8/12 xl:w-6/12 min-h-[650px] p-5 md:p-8 lg:p-10 rounded-2xl mt-8 md:mt-12 lg:mt-16 m-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
          Make All Tasks Done
        </h2>
        <TaskForm />
        <FilterTasks />
        <TodoList />
      </div>
    </>
  );
};
export default TaskWrapper;
