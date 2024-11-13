const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Fetch Todos and send to the client
  socket.on("getTodos", async () => {
    try {
      const response = await axios.get('https://6734a993a042ab85d11b20ee.mockapi.io/todo/task');
      socket.emit("todosData", response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      socket.emit("todosError", "Failed to fetch todos"); 
    }
  });

  socket.on("addTodo", async (todoData) => {
    try {
      const response = await axios.post("https://6734a993a042ab85d11b20ee.mockapi.io/todo/task", todoData);
      io.emit("todoAdded", response.data); 
    } catch (error) {
      console.error("Error adding todo:", error);
      socket.emit("todoError", "Failed to add todo"); 
    }
  });

  // Delete a todo and broadcast to all clients
  socket.on("deleteTodo", async (todoId) => {
    try {
      await axios.delete(`https://6734a993a042ab85d11b20ee.mockapi.io/todo/task/${todoId}`);
      io.emit("todoDeleted", todoId); 
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  });

  socket.on("updateTodo", async (todoId, updatedData) => {
    try {
      const response = await axios.put(`https://6734a993a042ab85d11b20ee.mockapi.io/todo/task/${todoId}`, updatedData);
      io.emit("todoUpdated", response.data); 
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});