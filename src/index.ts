import {Server}from 'socket.io'
import WordGenerator from './words'
import { Message, RoomConnectionData } from './types';

const io = new Server(3001)

let gen = new WordGenerator(['fruits', 'people', 'music']);

const userMap: Map<string, string> = new Map();


io.on("connection", (socket) => {
	socket.emit("connected", "Connected to the server successfully");
	console.log(`New client connected: ${socket.id}`)

	socket.on("join-room", (data: RoomConnectionData) => {
		userMap.set(socket.id, data.nickname)
		socket.join(data.room);
		socket.emit("room-confirm", userMap.get(socket.id))
		console.log(`New client: ${data.nickname} joined room: ${data.room}`)
	})

	socket.on("send-message", (msg: Message) => {
		console.log(`Sending message: ${msg.content}`)
		socket.rooms.forEach((room) => {
			socket.to(room).emit("receive-message", msg)
		})
	})

	socket.once("disconnect", () => {
		userMap.delete(socket.id)
		console.log(`Disconnected user: ${socket.id}`)
	})
})

