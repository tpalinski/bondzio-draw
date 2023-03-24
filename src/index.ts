import {Server}from 'socket.io'
import WordGenerator from './words'

const io = new Server(3001)

let gen = new WordGenerator(['fruits', 'people', 'music']);

io.on("connection", (socket) => {
	socket.emit("Connected to the server successfully");


	io.on("join-room", (data) => {
		console.log(data)
	})
})

