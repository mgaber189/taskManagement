// hooks/useSocket.js
import { useEffect } from 'react';
import io from 'socket.io-client';

const useSocket = (onTaskUpdate) => {
  useEffect(() => {
    const socket = io('http://localhost:4000'); // Replace with your server URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('taskUpdate', (data) => {
      // Invoke callback with new task data
      onTaskUpdate(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [onTaskUpdate]);
};

export default useSocket;
