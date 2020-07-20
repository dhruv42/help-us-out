import React, { useState, useEffect } from 'react';
// import axios from "axios";
import './App.css';
import Cards from "./components/Cards";
import socket from "./components/Socket";

export default function App() {

  const [response, setResponse] = useState([]);

  useEffect(() => {
    socket.emit("initialData")
    socket.on("FromAPI",(data)=>{
      setResponse(data)
    })

    socket.on("updateFromAPI",(data)=>{
      console.log("From update ----")
      console.log(data);
      setResponse(data)
    })

  }, [])




  return (
    <div className="App">
      <div className="container-fluid pt-3">
        <div className="card-deck">
          {response.length &&
            response.map((e, index) => {
              console.log("Redering ------")
              return <Cards data={e} key={e.id}/>
            })
          }
        </div>
      </div>
    </div>
  );
}