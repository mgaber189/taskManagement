import { Button, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { socket } from "../socket";
import { useDispatch, useSelector } from "react-redux";
import { selectEditTodos, setEditTodo } from "../redux/slice/todosSlice";
import { v4 as uuid } from "uuid";

const TaskForm = () => {
  const [form] = Form.useForm();
  const editTodo = useSelector(selectEditTodos);
  const dispatch = useDispatch();

  const updateTodoHandler = (todoId, updatedData) => {
    socket.emit("updateTodo", todoId, updatedData);
  };

  const handleSubmit = (values) => {
    if (!editTodo) {
      const newTodo = {
        todo: values.todo,
        completed: false,
        priority: values.priority,
      };
      socket.emit("addTodo", newTodo);
      form.resetFields();
    } else {
      updateTodoHandler(editTodo.id, {
        todo: values.todo,
        priority: values.priority,
      });
      dispatch(setEditTodo(null));
      form.resetFields();
    }
  };

  useEffect(() => {
    if (editTodo) {
      form.setFieldsValue({
        todo: editTodo.todo,
        priority: editTodo.priority,
      });
    } else {
      form.resetFields();
    }
  }, [editTodo, form]);

  return (
    <div className="w-full px-2 md:px-4 lg:px-6">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="sign-form flex flex-col md:flex-row items-center md:justify-between w-full max-w-xl md:max-w-2xl lg:max-w-3xl m-auto mt-5 mb-5 border border-1 rounded-xl overflow-hidden">
        <Form.Item
          name="todo"
          className="w-full md:w-5/12 lg:w-4/12 m-0 mb-4 md:mb-0"
          rules={[{ required: true, message: "Please enter a task" }]}>
          <Input
            placeholder="Write your task today"
            className="text-white bg-transparent border-0 hover:bg-transparent focus:bg-transparent placeholder:text-white text-lg md:text-xl h-full"
          />
        </Form.Item>

        <Form.Item
          name="priority"
          className="w-full md:w-4/12 lg:w-3/12 m-0 mb-4 md:mb-0 md:mx-3"
          rules={[{ required: true, message: "Please select a priority" }]}>
          <Select
            placeholder="Priority"
            size="large"
            className="white-placeholder !bg-transparent border-0 hover:bg-transparent focus:!bg-transparent"
            options={[
              { value: "high", label: "High" },
              { value: "medium", label: "Medium" },
              { value: "low", label: "Low" },
            ]}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          className="bg-[#F2B138] w-full md:w-5/12 lg:w-4/12 py-8 text-lg md:text-xl hover:!text-white hover:!bg-[#F2B138]">
          {editTodo ? "Update Task" : "Add Task"}
        </Button>
      </Form>
    </div>
  );
};

export default TaskForm;
