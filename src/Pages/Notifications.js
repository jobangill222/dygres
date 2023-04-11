import React, { useEffect, useContext, useState } from 'react';
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";
import SingleNotificationList from "../Components/Notification/SingleNotificationList";
import { BsFillBellFill, BsFillBellSlashFill } from "react-icons/bs";
import { AiFillLike, AiFillTag } from "react-icons/ai";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';


const Notifications = () => {

    const { user, getNotificationDContext, isLoading, setIsLoading, notificationList, setNotificationList, deleteAllNotificationDContext, setSearchState, notificationOnOffDContext, getUserDetailsDContext, readAllNotificationDContext, setIsNewNotificationArrive,isDummyUser } = useContext(DContext);
    const navigate = useNavigate();

    useEffect(() => {


        setSearchState(null)
        setNotificationList([]);

        notiOnOffStatus();
        setIsNewNotificationArrive(false)

        localStorage.setItem("notificationCurrentPage", 1);
        getNotificationList();
        readAllNotification();

    }, []);

    const getNotificationList = async () => {
        try {
            setIsLoading(true);

            //Api call
            let pageNumberOfNotificationList = 1;
            const axiosRes = await getNotificationDContext(pageNumberOfNotificationList);
            // console.log("axiosRes******** after get notification list", axiosRes);
            if (axiosRes.status === "success") {
                setNotificationList(axiosRes.list);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);

    };



    //Append next post list
    const appendNextList = async () => {
        let currentPage = localStorage.getItem("notificationCurrentPage");
        let pageNumberOfNotificationList = parseInt(currentPage) + 1;
        // console.log("appendNextList function call", pageNumberOfNotificationList);

        const axiosRes = await getNotificationDContext(pageNumberOfNotificationList);
        if (axiosRes.status === "success") {
            setNotificationList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("notificationCurrentPage", pageNumberOfNotificationList);
        }
    };


    //Clear all notification
    const deleteAllNotification = async () => {
        await deleteAllNotificationDContext();
        setNotificationList([]);
    }

    const [allNotificationOnOffState, setAllNotificationOnOffState] = useState(false);
    const [taggedNotificationOnOffStatus, setTaggedNotificationOnOffStatus] = useState(false);
    const [agreeNotificationOnOffState, setAgreeNotificationOnOffState] = useState(false);

    const notiOnOffStatus = async () => {

        const axiosRes = await getUserDetailsDContext();

        setAllNotificationOnOffState(axiosRes.data?.muteAllNotification)
        setTaggedNotificationOnOffStatus(axiosRes.data?.muteTaggedNotification)
        setAgreeNotificationOnOffState(axiosRes.data?.muteAgreeNotification)
    }


    const submitHandler = async (type) => {
        const axiosRes = await notificationOnOffDContext(type);
        setAllNotificationOnOffState(axiosRes.user.muteAllNotification)
        setTaggedNotificationOnOffStatus(axiosRes.user.muteTaggedNotification)
        setAgreeNotificationOnOffState(axiosRes.user.muteAgreeNotification)
    }




    const readAllNotification = async () => {
        try {
            const axiosRes = await readAllNotificationDContext();
            // console.log("axiosRes******** after get notification list", axiosRes);
            if (axiosRes.status === "success") {
                console.log(axiosRes.message);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);

    };


    const renderAllNotificationTooltip = (props) => (
        <Tooltip style={{ width: "400px", wordBreak: "break-all" }} className='infotooltip' id="button-tooltip" {...props}>
            <ul>
                <li>{!allNotificationOnOffState ? "Tap to mute all notifications." : " Tap to un-mute all notifications."}</li>
            </ul>
        </Tooltip>
    );

    const renderTaggedNotificationTooltip = (props) => (
        <Tooltip style={{ width: "400px", wordBreak: "break-all" }} className='infotooltip' id="button-tooltip" {...props}>
            <ul>
                <li>{!taggedNotificationOnOffStatus ? "Tap to mute tagged notifications." : " Tap to un-mute tagged notifications."}</li>
            </ul>
        </Tooltip>
    );

    const renderAgreeNotificationTooltip = (props) => (
        <Tooltip style={{ width: "400px", wordBreak: "break-all" }} className='infotooltip' id="button-tooltip" {...props}>
            <ul>
                <li>{!agreeNotificationOnOffState ? "Tap to mute agree notifications." : " Tap to un-mute agree notifications."}</li>
            </ul>
        </Tooltip>
    );

    return (
        <>
            {isLoading && <Loader />}

            <InfiniteScroll
                dataLength={notificationList.length}
                next={appendNextList}
                hasMore={true}
            >
                {/* {postList} */}
            </InfiniteScroll>

            <div className="Notfy-block">
                <div className="relative notification-title">

                    <h4>Notifications
                        <ul>
                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderAllNotificationTooltip} >
                                <li onClick={() => submitHandler('all')} className={allNotificationOnOffState ? 'mute' : ''}><BsFillBellFill /></li>
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTaggedNotificationTooltip}>
                                <li onClick={() => submitHandler('tag')} className={taggedNotificationOnOffStatus ? 'mute' : ''}><AiFillTag /></li>
                            </OverlayTrigger>

                            <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderAgreeNotificationTooltip} >
                                <li onClick={() => submitHandler('agree')} className={agreeNotificationOnOffState ? 'mute likeicon' : 'likeicon'}><AiFillLike /></li>
                            </OverlayTrigger>
                        </ul>
                    </h4>

                    {notificationList.length ?
                        <ul>
                            {/* <li><button className="btn-nill" type="button">Mark all as read</button></li> */}
                            <li><button className="btn-nill" type="button" onClick={deleteAllNotification} >Clear all</button></li>
                        </ul>
                        : ""}
                </div>




                {
                    notificationList.length ?
                        notificationList.map((singleNotification) => (
                            <SingleNotificationList
                                key={singleNotification._id}
                                singleNotification={singleNotification}
                            />
                        ))
                        :
                        <div className="empty-bar">
                            <img src="/images/empty.png" alt='dummy' />
                            <h4>No Notification</h4>
                        </div>
                }

            </div>


        </>
    );
}

export default Notifications;