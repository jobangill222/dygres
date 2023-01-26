import React, { useEffect, useContext } from 'react';
import { DContext } from "../Context/DContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../Components/Loader";
import SingleNotificationList from "../Components/Notification/SingleNotificationList";

const NotificationsNew = () => {

    const { getNotificationDContext, isLoading, setIsLoading, notificationList, setNotificationList, deleteAllNotificationDContext } = useContext(DContext);

    useEffect(() => {
        setNotificationList([]);
        localStorage.setItem("notificationCurrentPage", 1);
        getNotificationList();
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
        // console.log(
        //     "axiosRes********* after get hot posts on page",
        //     pageNumberOfNotificationList,
        //     axiosRes
        // );
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
                    <h4>Notifications</Newh4>
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

export default NotificationsNew;