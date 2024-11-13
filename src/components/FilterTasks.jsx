import { Button } from "antd";
import react from "react";
import { useDispatch } from "react-redux";
import { filterTodo } from "../redux/slice/todosSlice";
const FilterTasks = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center m-auto gap-2 md:gap-4 w-full max-w-md md:max-w-lg lg:max-w-xl">
        <Button
          onClick={() => dispatch(filterTodo("all"))}
          className="hover:!text-white text-white border-0 bg-[#F2B138] hover:!bg-[#F2B138] h-full text-lg md:text-xl w-full md:w-1/4">
          All
        </Button>
        <Button
          onClick={() => dispatch(filterTodo("high"))}
          className="hover:!text-white text-white border-0 bg-[#F2B138] hover:!bg-[#F2B138] h-full text-lg md:text-xl w-full md:w-1/4">
          High
        </Button>
        <Button
          onClick={() => dispatch(filterTodo("medium"))}
          className="hover:!text-white text-white border-0 bg-[#F2B138] hover:!bg-[#F2B138] h-full text-lg md:text-xl w-full md:w-1/4">
          Medium
        </Button>
        <Button
          onClick={() => dispatch(filterTodo("low"))}
          className="hover:!text-white text-white border-0 bg-[#F2B138] hover:!bg-[#F2B138] h-full text-lg md:text-xl w-full md:w-1/4">
          Low
        </Button>
      </div>
    </>
  );
};
export default FilterTasks;
