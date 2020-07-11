import React, { useState } from "react";
import axios from "axios";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";
import socket from "./Socket";

function Cards(props) {
    console.log("On card -------");
    // console.log(props);
    let { data } = props;
    // const {socket} = props
    const [employee, setEmployee] = useState({ ...data });
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = () => {
        console.log("Handle event caled ----")
        props.callback();
    }

    const updateEmployee = async (e) => {
        e.preventDefault();
        const updateData = { ...employee };
        socket.emit('updateData',updateData);
        handleClick()
        // axios.put(`http://localhost:5000/update`, updateData)
        //     .then((result) => {
        //         console.log(result)
        //         props.history.push('/list')
        //     }).catch((error) => {
        //         console.log(error);
        //     })

    }
    return (
        <div className="card" style={{ width: "200px" }}>
            <div className="card-header text-center">{employee.name}</div>
            {/* <img className="card-img-top" src="person.png" alt="Card" style={{ width: "100%" }} /> */}
            <div className="card-body" style={{ backgroundColor: employee.color }}>
                {/* <h4 className="card-title text-center">{employee.name}</h4> */}
                <p className="card-text">{employee.message}</p>
                <form onSubmit={updateEmployee} className="px-4 py-3">
                    <div className="form-group">
                        <input 
                            name="message" 
                            typr="text" 
                            onChange={handleChange} 
                            style={{ width: "100%" }} 
                            placeholder="Type your query here"
                            className="form-control"
                        />
                        <select onChange={handleChange} name="color" value={employee.color} className="form-control">
                            <option value="#FF7272">Red</option>
                            <option value="#9BF983">Green</option>
                            <option value="#F5C02E">Orange</option>
                        </select>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Cards