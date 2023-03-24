import socketio from 'socket.io'
import WordGenerator from './words'

let gen = new WordGenerator(['fruits', 'people', 'music']);
console.log(gen.getData())
console.log(gen.getCategory('fruits'))
