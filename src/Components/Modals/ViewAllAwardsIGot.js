import React, { useState, useContext, useEffect } from 'react'
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { DContext } from "../../Context/DContext";


const ViewAllAwardsIGot = (props) => {

    const { awardIGotPopupState, setAwardIGotPopupState } = props;

    const { getUsersAllAwardsTheyGet } = useContext(DContext);

    const closePopup = () => {
        setAwardIGotPopupState(false)
    }

    useEffect(() => {
        list();
    }, [])


    const [awardListState, setAwardListState] = useState([]);
    const list = async () => {
        const axiosRes = await getUsersAllAwardsTheyGet();
        setAwardListState(axiosRes.awardList)
    }

    return (

        <>
            <Modal
                className="Actions-modal viewpostawardsmodal awards-modal z-1050"
                show={awardIGotPopupState}
                onHide={closePopup}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Awards</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <ul className="awards-bar ">



                            {awardListState.length ? awardListState.map((award) => (
                                <li className="text-whitesure">
                                    <img src={award.awardDetail[0].image} alt="awards" />{award.awardCount}
                                </li>
                            )) : <>
                                {/* <img src="/images/empty.png" alt='dummy' /> */}
                                <h4>No Award</h4>
                            </>}

                            {/* <li className="text-whitesure">
                                <img src="" alt="awards" />4
                            </li> */}

                        </ul>

                    </Row>
                </Modal.Body>
            </Modal>

        </>
    )
}


export default ViewAllAwardsIGot;
