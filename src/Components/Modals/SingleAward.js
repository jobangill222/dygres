import React, { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { DContext } from "../../Context/DContext";

export default function SingleAward(props) {

    const { awardList, setAwardCount, selectedPostIDForAwardPopup, setAwardPopupOpenStatus } = props;

    const { SendAwardDContext, postList, setPostList, getSinglePostDetailDContext } = useContext(DContext);

    const [remainingAwardCountState, setRemainingAwardCountState] = useState(awardList?.award_count_detail?.remainingAwardCount);
    console.log('remainingAwardCountState', remainingAwardCountState);

    const [isAwardSent, setIsAwardSent] = useState(false);
    useEffect(() => {
        if (awardList.is_award_send === 1) {
            setIsAwardSent(true)
        }
    }, [])

    const sendAward = async () => {
        try {

            const axiosRes = await SendAwardDContext(selectedPostIDForAwardPopup, awardList._id);
            // console.log('axiosRes after send award', axiosRes);

            if (axiosRes.status === 'success') {

                //Ramianing specific award count
                setRemainingAwardCountState((previousState) => previousState - 1);

                //Inc by 1 in post foot when send award to post
                setAwardCount((previousState) => previousState + 1);
                setIsAwardSent(true)

                //Replace single post when award has been sent
                const singlePostAxiosRes = await getSinglePostDetailDContext(selectedPostIDForAwardPopup);
                var res = postList.map(obj => singlePostAxiosRes.list.find(o => o._id === obj._id) || obj);
                // console.log('res', res)
                setPostList(res);


                //Close popup
                setAwardPopupOpenStatus(false)


            }
            else {
                toast(axiosRes.message)
            }

        } catch (err) {
            console.log('Some issue in SingleReward.js - ', err);
        }
    }
    return (
        <>
            {console.log('remainingAwardCountState', remainingAwardCountState)}

            <Col className="col-md-4">
                <div className="Awrds-li">

                    <img src={awardList?.image} alt="img" />
                    <h4>{awardList?.name}</h4>
                    {isAwardSent ? <button className="btn-primary" >Sent</button> : <button className="btn-primary" onClick={sendAward} disabled={awardList.status === "paid" && remainingAwardCountState === 0 ? true : false} >Send</button>}

                    {awardList.status === "free" && <h4>free</h4>}
                    {remainingAwardCountState > 0 && <h4>{remainingAwardCountState}(left)</h4>}
                    {remainingAwardCountState === 0 && <h4>Over</h4>}

                </div>
            </Col>
        </>
    )
}
