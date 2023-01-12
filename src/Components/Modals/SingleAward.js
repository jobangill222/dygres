import React, { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { DContext } from "../../Context/DContext";

export default function SingleAward(props) {

    const { awardList, setAwardCount } = props;
    // console.log(awardList, awardList)


    const { selectedPostIDForAwardPopup, SendAwardDContext } = useContext(DContext);

    const [isAwardSent, setIsAwardSent] = useState(false);
    useEffect(() => {
        if (awardList.is_award_send === 1) {
            setIsAwardSent(true)
        }
        console.log('isAwardSentisAwardSent', isAwardSent)
    }, [])

    const sendAward = async () => {
        try {
            const axiosRes = await SendAwardDContext(selectedPostIDForAwardPopup, awardList._id);
            console.log('axiosRes after send award', axiosRes);
            setIsAwardSent(true)
            setAwardCount((previousState) => previousState + 1);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Col className="col-md-4">
                <div className="Awrds-li">
                    <img src={awardList?.image} alt="img" />
                    <h4>{awardList?.name}</h4>
                    {isAwardSent ? <button className="btn-primary" >Sent</button> : <button className="btn-primary" onClick={sendAward} >Send</button>}
                </div>
            </Col>
        </>
    )
}
