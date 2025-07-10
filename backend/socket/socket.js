import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin: [
            "http://localhost:3000",
            "https://chatify-frontend-bra9.onrender.com" // ✅ After Render frontend deploy
        ],
        credentials: true,
        methods:['GET', 'POST'],
    },
});

const userSocketMap = {}; // {userId->socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}



io.on('connection', (socket)=>{
    const userId = socket.handshake.query.userId
    if(userId !== undefined){
        userSocketMap[userId] = socket.id;
    } 

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect', ()=>{
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
    })

})

export {app, io, server, getReceiverSocketId };
