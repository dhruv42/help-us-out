import React, { useState, useEffect } from "react";

function Modal(props) {
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" style={{backgroundColor:"blue"}}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">

                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">New message</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <textarea className="form-control"></textarea>
                            </div>
                        </form>

                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Send message</button>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Modal
