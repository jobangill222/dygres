import React from 'react'

import moment from "moment";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)

export default function PostRetweetForm(props) {

    const timeAgo = new TimeAgo('en-US')

    const { parentPostDetail } = props;


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
                                <h6 className="text-lightgray">@{parentPostDetail[0]?.user[0].username}</h6>
                                <h5 className="text-lightgray greentime">{timeAgo.format(moment(parentPostDetail[0]?.created_at)._d.getTime())}</h5>
                            </div>
                            <div className="levelbar text-darkwhite level1">
                                Level {parentPostDetail[0].user[0].isEmailVerify === 1 && parentPostDetail[0].user[0].isPhotoVerify === 0 ? '1' : parentPostDetail[0].user[0].isPhotoVerify === 1 ? "2" : "0"}
                                <h6 className="level1-circle">
                                    <span className="text-white lvlstar">{parentPostDetail[0].user[0].isEmailVerify === 1 && parentPostDetail[0].user[0].isPhotoVerify === 0 ? '1' : parentPostDetail[0].user[0].isPhotoVerify === 1 ? "2" : "0"}</span>
                                </h6>
                            </div>
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
