import React, { useState, useEffect } from 'react';
import axios from "axios";
import socketIOClient from "socket.io-client";
import './App.css';
import Cards from "./components/Cards";
import socket from "./components/Socket";
// const ENDPOINT = "http://127.0.0.1:5000";
// const socket = socketIOClient(ENDPOINT);
// function AppAPI() {
//   // console.log("On App---")
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const getData = async () => {
//       const result = await axios('http://localhost:5000/');
//       setData(result.data)
//     }
//     getData();
//   }, [])

//   return (
//     <div className="App">

//       <div className="container-fluid pt-3">
//         <div className="card-deck">
//           {
//             data.map((e, index) => {
//               return (

//                 <Cards data={e} key={e.id} />

//               )
//             })
//           }
//         </div>
//       </div>
//     </div>
//   );
// }


function App() {
  const [response, setResponse] = useState([]);
  useEffect(()=>{
    socket.on("FromAPI",data=>{
      setResponse(data);
    })
  },[]);

  function fromChild() {
    socket.on("FromAPI",data=>{
      console.log("From PAPI")
      console.log(data);
      setResponse(data);
    })

    // console.log("Call from child")
    // console.log(e);
    // let updated = response.map(i => {
    //   if(e.id == i.id) {
    //     return e
    //   }
    //   return i
    // })
    // setResponse(updated);
  }

  return (
    // <p>
    //   It's <time dateTime={response}>{response}</time>
    // </p>
    <div className="App">
      <div className="container-fluid pt-3">
        <div className="card-deck">
          {
            response.map((e, index) => {
              return (
                <Cards data={e} key={e.id} callback={fromChild}/>
              )
            })
          }
        </div>
      </div>
    </div>
  );

}

export default App;
