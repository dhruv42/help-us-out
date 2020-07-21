import React, { useState, useEffect } from "react";
import Modal from "react-modal"
import socket from "./Socket";

function Cards(props) {
    console.log("On card -------", props.data);
    let { data } = props;
    const [employee, setEmployee] = useState({});
    const [showModal, setModalState] = useState(false);
    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setEmployee(data);
    }, [data])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setModalState(false);
        const updateData = { ...employee };
        socket.emit('updateData', updateData);
    }

    const messageColor = employee.color == "#FFFFFF" ? "default-text-color" : "text-white"
    return (
        <>
            <div className="card">
                <div className="card-header text-center bg-dark text-white">{employee.name}</div>

                <div className="card-body" style={{ backgroundColor: employee.color }}>
                    <p className={`card-text text-center ${messageColor}`}>{employee.message}</p>
                    {/* <form onSubmit={updateEmployee} className="px-4 py-3">
                    <div className="form-group">
                        <input
                            name="message"
                            type="text"
                            onChange={handleChange}
                            style={{ width: "100%" }}
                            placeholder="Type your query here"
                            className="form-control"
                        />
                        <select onChange={handleChange} name="color" value={employee.color} className="form-control color-dropdown">
                            <option value="#FF7272">Red</option>
                            <option value="#9BF983">Green</option>
                            <option value="#F5C02E">Orange</option>
                        </select>
                        <button type="submit" className="btn btn-primary submit-button">Submit</button> <br />
                        <button type="button" className="btn btn-primary edit-button" data-toggle="modal" data-target="#exampleModal">Edit</button>

                    </div>
                </form> */}
                    <button type="button" className="btn btn-primary edit-button" onClick={() => setModalState(true)}>Edit</button>
                </div>
            </div>
            <Modal
                isOpen={showModal} ariaHideApp={false}
                onRequestClose={() => setModalState(false)}
                // className={"modal-dialog modal-lg"}
                style={{
                    overlay: { backgroundColor: 'grey' }
                }   }
            >
                <div className="modal-header bg-dark text-white">
                    <h5 className="modal-title" id="exampleModalLabel">{employee.name}</h5>
                    <button type="button" onClick={() => setModalState(false)} className="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ backgroundColor: employee.color }}>
                    <form onSubmit={handleSubmit} className="px-4 py-3">
                        <div className="form-group">
                            <label className="text-white">Message:</label>
                            <textarea
                                value={employee.message}
                                onChange={handleChange}
                                name="message"
                                className="form-control"
                            />
                            <select onChange={handleChange} name="color" value={employee.color} className="form-control color-dropdown">
                                <option value="#dc3545">Red</option>
                                <option value="#28a745">Green</option>
                                <option value="#fd7e14">Orange</option>
                            </select>
                            <button type="submit" className="btn btn-primary submit-button">Send message</button>
                        </div>
                    </form>
                </div>
            </Modal>

        </>

    );

}

export default Cards