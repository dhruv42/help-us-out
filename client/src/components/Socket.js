import openSocket from 'socket.io-client';
const socket = openSocket("http://localhost:5000");
export default socket;