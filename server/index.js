const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const userRoutes = require("./routes/userRoutes")
const messagesRoute = require("./routes/messagesRoute")
const socket = require('socket.io')
require("dotenv").config()

app.use(cors())
app.use(express.json())
app.use("/api/auth", userRoutes)
app.use('/api/messages', messagesRoute)



mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Mongoose connected sucessfully...");
}).catch((err) => {
    console.log(err.message);
})


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../public/chat-app/build/'))
} 


const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true
    }
})

global.onlineUsers = new Map()

io.on("connection", (socket) => {
    global.chatSocket = socket
    socket.on("add-user", (userId)=> {
        onlineUsers.set(userId, socket.id)
    })
    socket.on('send-msg', (data) => {
        const sendUserSocket = onlineUsers.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit('msg-recieve', data.message)
        }
    })
})