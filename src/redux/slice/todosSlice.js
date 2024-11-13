import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  editTodo: null,
  isConnected: false,
  filteredTodos:null
};


const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload; 
    },
    setEditTodo(state, action) {
      state.editTodo = action.payload;
    },
    addTodo: (state, action) => {
      state.todos = state.todos
        ? [...state.todos, action.payload]
        : [action.payload]; 
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    filterTodo: (state, action) => {
      if(action.payload === "all"){
        state.filteredTodos = null
      }else{

        state.filteredTodos = state.todos.filter((todo) => todo.priority === action.payload);
      }
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id ? action.payload : todo
      );
    },
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {
  setTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  setEditTodo,
  setConnectionStatus,
  filterTodo,
} = todosSlice.actions;

export const selectTodos = (state) => state.todos.todos;
export const selectEditTodos = (state) => state.todos.editTodo;
export const selectFilterTodos = (state) => state.todos.filteredTodos;

export default todosSlice.reducer;
