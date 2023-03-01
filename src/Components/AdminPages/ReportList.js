import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from "react-router-dom";

// Context
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";


const ReportList = () => {

    const { isLoading, setIsLoading, getReportListDContext } = useContext(DContext);

    const [reportList, setReportList] = useState([]);

    useEffect(() => {
        localStorage.setItem('userReportPageNumber', 1);
        getList();
    }, [])

    const getList = async () => {
        setIsLoading(true);
        const pageNumber = 1;
        const axiosRes = await getReportListDContext(pageNumber);
        console.log('axiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === "success") {
            setReportList(axiosRes.list);
        } else {
            toast(axiosRes.message);
        }
        setIsLoading(false);
    }



    //Append next post list
    const appendNextList = async () => {
        let currentAdminUserListPage = localStorage.getItem("userReportPageNumber");
        let pageNumberOfReportList = parseInt(currentAdminUserListPage) + 1;
        const axiosRes = await getReportListDContext(pageNumberOfReportList);
        if (axiosRes.status === "success") {
            setReportList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("userReportPageNumber", pageNumberOfReportList);
        }
    };

    const navigate = useNavigate();

    const viewPost = async (postID) => {
        navigate('/admin/post/single-post/' + postID)
    }

    return (
        <>

            {/* {console.log('userListuserList', userList)} */}
            {isLoading && <Loader />}


            <InfiniteScroll
                dataLength={reportList.length}
                next={appendNextList}
                hasMore={true}
                // loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: "center" }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {/* {postList} */}
            </InfiniteScroll>


            <Container>
                <div className="dashboard-title-bar">
                    <Row>

                        <Col lg="6"><h4>Report List</h4>
                        </Col>

                    </Row>
                </div>
                <div className="usertable">
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Reason</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>

                            {reportList.map((list) => (
                                <tr>
                                    <td>{list.userID.username}</td>
                                    <td>{list?.reportReason}</td>
                                    <td>{list?.description ? list.description : 'No description'}</td>
                                    <td>
                                        <div class="sendbtn">
                                            <button className='btn btn-primary' onClick={() => viewPost(list.postID)} >View Post</button>
                                        </div>
                                    </td>

                                </tr>
                            ))}

                        </tbody>
                    </Table>
                </div>
            </Container>

        </>
    );
}

export default ReportList;