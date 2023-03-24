import socketio from 'socket.io'
import WordGenerator from './words'

let gen = new WordGenerator(['fruits']);
console.log(gen.getData())
console.log(gen.getCategory('fruits'))
