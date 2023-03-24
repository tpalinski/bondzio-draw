import socketio from 'socket.io'
import WordGenerator from './words'

let gen = new WordGenerator(['fruits', 'people', 'music']);
console.log(gen.getRandomWord('fruits'))
console.log(gen.getRandomWord('people'))
