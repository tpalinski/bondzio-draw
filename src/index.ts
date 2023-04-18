import {Server}from 'socket.io'
import WordGenerator from './words'
import { DrawCoords, Message, RoomConnectionData } from './types';

const io = new Server(3001, {
	cors: {
		origin: "*"
	}
})

let gen = new WordGenerator(['fruits', 'people', 'music']);

const userMap: Map<string, string> = new Map();
const roomsMap: Map<string, string> = new Map();

io.on("connection", (socket) => {
	socket.emit("connected", "Connected to the server successfully");
	console.log(`New client connected: ${socket.id}`)

	socket.on("join-room", (data: RoomConnectionData) => {
		userMap.set(socket.id, data.nickname)
		socket.join(data.room);
		socket.emit("room-confirm", userMap.get(socket.id))
		console.log(`New client: ${data.nickname} joined room: ${data.room}`)
		if(!roomsMap.has(data.room)) {
			roomsMap.set(data.room, gen.getRandomWord('fruits'))
		}
	})

	socket.on("send-message", (msg: Message) => {
		let room = [...socket.rooms][1];
		console.log(`Sending message: ${msg.content} to room ${room}`)
		socket.to(room).emit("receive-message", msg)
	})

	socket.on("send-draw", (coords: DrawCoords) => {
		let room = [...socket.rooms][1];
		socket.to(room).emit("receive-draw", coords)
	})

	socket.on("guess", (guess: string) => {
		let room = [...socket.rooms][1];
		let correctGuess = roomsMap.get(room)
		if(correctGuess != undefined &&
		   correctGuess === guess){
			socket.emit("correct-guess")
			socket.to(room).emit("opponent-guessed", userMap.get(socket.id))
			roomsMap.set(room, "You are pretty smart if you guessed this correctly")	
		}
	})

	socket.on("generate-new-word", (category: string) => {
		try {
			var word = gen.getRandomWord(category)
			socket.emit("new-word", word);
		} catch(e) {
			console.log(e)
			return;
		}
	})

	socket.once("disconnect", () => {
		console.log(`Disconnected user: ${userMap.get(socket.id)}`)
		userMap.delete(socket.id)
	})
})

