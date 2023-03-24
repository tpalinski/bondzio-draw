import {Server}from 'socket.io'
import WordGenerator from './words'

const io = new Server(3001)

let gen = new WordGenerator(['fruits', 'people', 'music']);

const userMap: Map<string, string> = new Map();



io.on("connection", (socket) => {
	socket.emit("connected", "Connected to the server successfully");
	console.log(`New client connected: ${socket.id}`)

	socket.on("join-room", (data) => {
		console.log(data)
	})
})

