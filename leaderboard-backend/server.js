const http = require("http");
const socketIO = require("socket.io");
const app = require("./src/app");

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173/",
    methods: ["GET", "POST"],
  },
});
global.io = io;
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port no : ${PORT}`);
});
