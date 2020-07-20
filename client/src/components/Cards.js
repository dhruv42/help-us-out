import React, { useState, useEffect } from "react";
import socket from "./Socket";

function Cards(props) {
    console.log("On card -------",props.data);
    let { data } = props;
    const [employee, setEmployee] = useState({});
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        setEmployee(data);
    },[data])


    const updateEmployee = async (e) => {
        e.preventDefault();
        const updateData = { ...employee };
        socket.emit('updateData',updateData);
    }
    return (
        <div className="card" style={{ width: "200px" }}>
            <div className="card-header text-center">{employee.name}</div>

            <div className="card-body" style={{ backgroundColor: employee.color }}>
                <p className="card-text">{employee.message}</p>
                <form onSubmit={updateEmployee} className="px-4 py-3">
                    <div className="form-group">
                        <input 
                            name="message" 
                            type="text" 
                            onChange={handleChange} 
                            style={{ width: "100%" }} 
                            placeholder="Type your query here"
                            className="form-control"
                        />
                        <select onChange={handleChange} name="color" value={employee.color} className="form-control">
                            <option value="red">Red</option>
                            <option value="green">Green</option>
                            <option value="orange">Orange</option>
                        </select>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Cards