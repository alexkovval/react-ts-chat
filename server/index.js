const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const users = require("./routes/users");
const rooms = require("./routes/rooms");
const messages = require("./routes/messages");

const app = express();
const http = require("http");
const httpServer = http.createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  },
});

const Message = require("./models/messages");
const user = require("./models/user");

httpServer.listen(5000);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/users", users);
app.use("/rooms", rooms);
app.use("/messages", messages);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Successful connection to the database");
});

mongoose.connection.on("error", (err) => {
  console.log("Not successful connection to the database" + err);
});

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("join_room", (roomId) => {
    console.log("User joined the room: " + roomId + " SocketId: " + socket.id);
    socket.join(roomId);
  });
<<<<<<< HEAD
=======
  
  socket.on("leave_room", (roomId) => {
    console.log("User joined the room: " + roomId + " SocketId: " + socket.id);
    socket.leave(roomId);
  });
>>>>>>> 650be61... second commit

  socket.on("newMessage", (newMessage) => {
    console.log(
      "Message: " +
        newMessage.message +
        ", SocketId: " +
        newMessage.socket +
        ", RoomId: " +
        newMessage.roomId,
    );
    let message = new Message({
      username: newMessage.username,
      message: newMessage.message,
      roomId: newMessage.roomId,
    });
    console.log(message.message, message.username);
    message.save().then(() => {
      // socket.to(message.roomId).emit("receive_message", message);
      //socket.broadcast.to
      console.log(`RoomId from server: ${message.roomId}`);
      io.to(message.roomId).emit("receive_message", message);
    });
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
