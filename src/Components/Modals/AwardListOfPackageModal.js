import React, { useContext, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AwardListOfPackageModal(props) {

    const { viewAwardOfPackageState, setViewAwardOfPackageState, awardOfPackage } = props

    console.log('awardOfPackage,awardOfPackage', awardOfPackage);

    const closeAwardOfPackage = async () => {
        setViewAwardOfPackageState(false);
    }


    const [awardListOfPackageState, setAwardListOfPackageState] = useState([]);
    useEffect(() => {
        setAwardListOfPackageState(awardOfPackage);
    }, [])


    return (
        <>
            <Modal
                className="Actions-modal awards-modal z-1050"
                show={viewAwardOfPackageState}
                onHide={closeAwardOfPackage}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Awards Of Package</Modal.Title>

                </Modal.Header>
                <Modal.Body>
                    <Row>

                        {awardListOfPackageState.map((awardList) => (
                            <>
                                {/* <h1>ddd</h1> */}
                                <Col className="col-md-4">
                                    <div className="Awrds-li">
                                        <div className="awards-img">
                                            <img src={awardList?.award?.image || "/gif/thumbsdown2.gif"} alt="img" />
                                        </div>
                                        <h5>{awardList.award.name}</h5>
                                        <h5>X {awardList.awardCount}</h5>


                                    </div>
                                </Col>
                            </>

                        ))}

                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
}

