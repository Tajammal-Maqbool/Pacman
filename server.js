const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socket = require("socket.io");
const mongoose = require("mongoose");
const userModel = require("./user.js");
const res = require("express/lib/response");
require('dotenv').config();

const LISTER_PORT = 8080;
const ABS_STATIC_PATH = __dirname + '/public';

//Database

mongoose.connect(
  process.env.CONNECTIONSTRING, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {console.log("Connected successfully");});


const io = socket(server);

io.on("connection",(socket)=>{
  //User Connection
  socket.on("signup",async (obj)=>{
    const user = new userModel(obj);
    await user.save();
    socket.emit("message","Successfully Sign Up");
  });
  socket.on("login",async (obj)=>{
    const result = await userModel.findOne({Username: obj.Username,Password: obj.Password});
    if(result != null){
      socket.emit("login",result);
      socket.emit("message","Successfully Login");
    }
    else{
      socket.emit("message","Failed Login");
    }
  });
  socket.on("save",async (obj)=>{
    await userModel.updateOne({Username: obj.Username,Password: obj.Password},{Username: obj.Username,Password: obj.Password,Games: obj.Games});
  });
  socket.on("allusers",async ()=>{
    const users = await userModel.find({});
    var userMap = [];
    users.forEach(function(user) {
      userMap.push(user);
    });
    socket.emit("allusers",userMap);
  })
});

// Set Route
app.get("/", function (req, res) {
  res.sendFile("index.html", { root: ABS_STATIC_PATH });
});

server.listen(LISTER_PORT);
app.use(express.static(__dirname + "/public"));
console.log("Listening on Port " + LISTER_PORT);