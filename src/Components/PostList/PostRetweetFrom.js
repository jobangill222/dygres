import React, { useEffect, useState } from 'react'
import Tooltip from 'react-bootstrap/tooltip';
import OverlayTrigger from 'react-bootstrap/overlayTrigger';
import moment from "moment";
import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// TimeAgo.addDefaultLocale(en)
import { levelBelowPost } from "../../helper/levelBelowPost";

export default function PostRetweetFrom(props) {

    const timeAgo = new TimeAgo('en-US')

    const { parentPostDetail } = props;

    const [verificationLevelState, setVerificationLevelState] = useState(0);
    //Verification Level
    useEffect(() => {
        getLevel();
    }, [parentPostDetail])

    const getLevel = async () => {
        // const res = await verificationLevel(parentPostDetail[0]?.user[0]?.isEmailVerify, parentPostDetail[0]?.user[0]?.isPhotoVerify);
        const res = await levelBelowPost(parentPostDetail[0]?.isPostByOfficial, parentPostDetail[0]?.user[0]?.level, parentPostDetail[0]?.user[0]?.isOfficial);

        setVerificationLevelState(res);
    }

    const verificationtooltip = (
        <Tooltip id="verificationtooltip">
            {/* {parentPostDetail[0]?.user[0]?.isEmailVerify === 1 && parentPostDetail[0]?.user[0]?.isPhotoVerify === 0 ? 'Verified Email' : parentPostDetail[0]?.user[0]?.isPhotoVerify === 1 ? "Verified Human" : "No Verification"} */}
            {verificationLevelState && verificationLevelState === 4 ? 'Verified official account' : verificationLevelState === 1 ? 'Verified Email' : verificationLevelState === 2 ? "Verified Human" : "New account"}
        </Tooltip>
    );

    return (
        < div className="digital-feeds diffrentiate-bar" >
            <div className="user-detail-bar">
                <div className="detailleft">
                    <div className="userleftside">
                        <div className="avatar-img active">
                            <img src={parentPostDetail[0]?.user[0]?.profileImage || `/images/user.png`} alt="user-img" />
                        </div>
                        <div className="user-detail">
                            <div className="follow-bar">
                                <h4 className="text-secondry">
                                    {/* {console.log('parentPostDetail', parentPostDetail)} */}
                                    {parentPostDetail[0]?.user[0]?.name ? parentPostDetail[0]?.user[0]?.name : parentPostDetail[0]?.user[0]?.username}
                                </h4>
                            </div>
                            <div className="user-availbility">

                                <h6 className="text-lightgray">@{parentPostDetail[0]?.user[0]?.username || ""}</h6>
                                <h5 className="text-lightgray greentime">{timeAgo.format(moment(parentPostDetail[0]?.created_at)._d.getTime())}</h5>
                            </div>
                            <OverlayTrigger placement="top" overlay={verificationtooltip}>
                                {verificationLevelState === 4 ?
                                    <div className="levelbar text-darkwhite level1">
                                        Official
                                    </div> :
                                    <div className="levelbar text-darkwhite level1">
                                        Level {verificationLevelState}
                                    </div>
                                }
                            </OverlayTrigger>
                        </div>
                    </div>
                </div>
            </div>
            <div className="user-preview">
                <div className="Description-bar">
                    <p>
                        {parentPostDetail[0].content}
                    </p>
                </div>
            </div>
        </div >
    )
}
