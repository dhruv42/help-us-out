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
                    <button type="button" className="btn btn-primary edit-button" onClick={() => setModalState(true)}>Edit</button>
                </div>
            </div>
            <Modal
                isOpen={showModal} ariaHideApp={false}
                onRequestClose={() => {
                    setModalState(false);
                }}
                style={{
                    overlay: {
                        // backgroundColor: 'grey',
                    },
                    content: {
                        position: 'relative',
                        width: 'auto',
                        height: 'auto',
                        maxHeight: '50%',
                        maxWidth: '40%',
                        top: '10%',
                        left: '30%',
                        border:'1px solid black',
                        borderRadius:'10px'
                    
                    }
                }}
            >
                <div className="modal-header bg-dark text-white">
                    <h5 className="modal-title" id="exampleModalLabel">{employee.name}</h5>
                    <button type="button" onClick={() => setModalState(false)} className="close text-white" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body" style={{ backgroundColor: employee.color }}>
                    <form onSubmit={handleSubmit} >
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