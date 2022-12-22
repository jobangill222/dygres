import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";


const AggreeModal = () => {
    // Aggree Modal
    const [showAggrelist, setListAggreeShow] = useState(true);
    const AggreeListClose = () => setListAggreeShow(false);
    // const AggreeListShow = () => setListAggreeShow(true);
    return (
        <>
            {/* Aggree modal */}
            <Modal
                className="Actions-modal"
                show={showAggrelist} onHide={AggreeListClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Agreed by</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                    <ul className="aggree-li">
                        <li>
                            <img src="/images/user.png" alt="userimg" />
                            <div className="user-del">
                                <h4>Methew Reed</h4>
                                <h6>@methew11</h6>
                            </div>
                        </li>
                        <li>
                            <button className="followbtn" type="button">
                                Follow
                            </button>
                        </li>
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AggreeModal;