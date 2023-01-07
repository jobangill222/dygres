import React, { useState, useContext, useEffect } from 'react'
import {
    AiOutlinePlus,
} from "react-icons/ai";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { DContext } from "../../Context/DContext";
import SingleAward from "./SingleAward";
import SinglePackageList from './SinglePackageList';


const AwardModal = (props) => {

    const { awardPopupOpenStatus, setAwardPopupOpenStatus } = props;
    const { selectedPostIDForAwardPopup, setSelectedPostIDForAwardPopup, getAwardListToSendDContext, getPackagesToBuyDContext } = useContext(DContext);
    // console.log('selectedPostIDForAwardPopup', selectedPostIDForAwardPopup);

    const [awardListToSend, setAwardListToSend] = useState([]);
    // const [showAwards, setAwardsClose] = useState(awardPopupOpenStatus);
    const AwardsClose = () => {
        // setAwardsClose(false);
        setAwardPopupOpenStatus(false);
        setSelectedPostIDForAwardPopup(null);
    }

    useEffect(() => {
        AwardListToSend();
    }, [])

    //Get User list post
    const AwardListToSend = async () => {
        try {
            const axiosRes = await getAwardListToSendDContext(selectedPostIDForAwardPopup);
            console.log('axiosRes to get award list', axiosRes);
            setAwardListToSend(axiosRes.list)
        } catch (err) {
            console.log(err);
        }
    };



    const [packageList, setpackageList] = useState([]);
    // BuyMore Awards
    const [showBuyPackages, setShowBuyPackages] = useState(false);
    const BuyMorePackageClose = () => setShowBuyPackages(false);
    const BuyMorePackageShow = async () => {
        const axiosRes = await getPackagesToBuyDContext();
        // console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
        setpackageList(axiosRes.list)
        setShowBuyPackages(true);
    }

    return (

        <>
            <Modal
                className="Actions-modal awards-modal z-1050"
                show={awardPopupOpenStatus}
                onHide={AwardsClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Awards</Modal.Title>
                    <button onClick={BuyMorePackageShow} className="btn-add">
                        Buy more
                        <AiOutlinePlus />
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <Row>

                        {awardListToSend.map((awardList) => (
                            < SingleAward awardList={awardList} />
                        ))}

                    </Row>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
            {/* BuyAwards modal */}
            <Modal
                className="Actions-modal buymore-modal "
                show={showBuyPackages}
                onHide={BuyMorePackageClose}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Buy awards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>

                        {packageList.map((singlePackage) => (
                            <SinglePackageList singlePackage={singlePackage} setShowBuyPackages={setShowBuyPackages} setAwardPopupOpenStatus={setAwardPopupOpenStatus} />
                        ))}


                    </Row>
                </Modal.Body>
                <Modal.Footer></Modal.Footer>
            </Modal>
        </>
    )
}


export default AwardModal;
