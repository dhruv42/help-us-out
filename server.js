const express = require('express');
const socketIO = require('socket.io')
const http = require('http')

const app = express()

const routes = require('./routes');
app.use('/', routes);

const server = http.createServer(app)
const io = socketIO(server);

const port = process.env.PORT || 5000;
let data = [
  {
    id: "dhrumil_popat",
    name: "Dhrumil Popat",
    color: "#FF7272",
    message: "stuck in elastic search"
  },
  {
    id: "saransh_jain",
    name: "Saransh Jain",
    color: "#9BF983",
    message: "cart pre-order changes"
  },
  {
    id: "ashish_kadam",
    name: "Ashish Kadam",
    color: "#F5C02E",
    message: "Gateway issue"
  },
  {
    id: "manpreet_krishan",
    name: "Manpreet Krishan",
    color: "",
    message: "Godam Push"
  },
  {
    id: "tejas_sharma",
    name: "Tejas Sharma",
    color: "#F5C02E",
    message: "Commission Issue, need to check with Sagar"
  }
]

// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//      next();
// });
io.on('connection', (socket) => {
  console.log("New Client connected !");
  getData(socket);

  socket.on("updateData", (updateData) => {
    console.log("Update Data event -----");
    console.log(updateData)
    data = data.map((i) => {
      if (i.id == updateData.id) {
        return updateData
      }
      return i
    })
    getData(socket);
  });

  socket.on('disconnect', () => {
    console.log("Client disconnected !");
  })
})

// io.on('updateData', (updateData) => {
//   console.log("Update Data event -----");
//   data = updateData.map((i) => {
//     if (i.id == req.body.id) {
//       return req.body
//     }
//     return i
//   })
//   io.emit("FromAPI", data);
// })


const getData = socket => {
  socket.emit("FromAPI", data);
}



server.listen(port, () => console.log(`Server listening on port ${port}`))