import React, { useContext, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { DContext } from "../../Context/DContext";

export default function SingleAward(props) {

    const { awardList, setAwardCount, selectedPostIDForAwardPopup, setAwardPopupOpenStatus } = props;
    // console.log(awardList, awardList)


    const { SendAwardDContext, postList, setPostList, getSinglePostDetailDContext } = useContext(DContext);

    const [isAwardSent, setIsAwardSent] = useState(false);
    useEffect(() => {
        if (awardList.is_award_send === 1) {
            setIsAwardSent(true)
        }
    }, [])

    const sendAward = async () => {
        try {

            // let array = [
            //     {
            //         _id: "63bfedbb1f398421587a47d6",
            //         userID: "63bfd85c2ca7fda2e8ce4e2a",
            //         content: "ssss",
            //         agree_count: 0,
            //         disagree_count: 0,
            //         totalVotes: 0,
            //         isDeleted: 0,
            //         parentPostID: null,
            //         modified_at: "2023-01-12T11:23:39.381Z",
            //         created_at: "2023-01-12T11:23:39.381Z",
            //         __v: 0,
            //         report_count: 0,
            //         is_follow: 0,
            //         is_agree: 0,
            //         is_disagree: 0,
            //         is_report: 0,
            //         comment_count: 0,
            //         award_count: 0,
            //         user: {
            //             _id: "63bfd85c2ca7fda2e8ce4e2a",
            //             email: "demo333333@yopmail.com",
            //             isEmailVerify: 0,
            //             isPhotoVerify: 0,
            //             username: "demo333333936",
            //             profileImage: null
            //         },
            //         postAward: [{
            //             "_id": {
            //                 "awardID": "63bfdbab1aabb9896d9968ff"
            //             },
            //             "awardCount": 1,
            //             "awardID": "63bfdbab1aabb9896d9968ff",
            //             "awardDetail": [
            //                 {
            //                     "_id": "63bfdbab1aabb9896d9968ff",
            //                     "name": "Award 4",
            //                     "image": "http://dygres.dev.seraphic.io/node/awards/image-1673517995525.gif"
            //                 }
            //             ]
            //         },]
            //     },
            // ];

            // var res = postList.map(obj => array.find(o => o._id === obj._id) || obj);
            // console.log('res', res)
            // setPostList(res);

            // return

            // console.log('selectedPostIDForAwardPopup', selectedPostIDForAwardPopup)

            const axiosRes = await SendAwardDContext(selectedPostIDForAwardPopup, awardList._id);
            // console.log('axiosRes after send award', axiosRes);

            if (axiosRes.status === 'success') {

                setIsAwardSent(true)
                setAwardCount((previousState) => previousState + 1);

                //Replace single post when award has been sent
                const singlePostAxiosRes = await getSinglePostDetailDContext(selectedPostIDForAwardPopup);
                var res = postList.map(obj => singlePostAxiosRes.list.find(o => o._id === obj._id) || obj);
                // console.log('res', res)
                setPostList(res);

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
