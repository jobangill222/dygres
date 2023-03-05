import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
// import { BsThreeDotsVertical, BsFilePost, BsFlag } from 'react-icons/bs';
// import { MdBlock } from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

// Context
import { DContext } from "../../Context/DContext";
import { toast } from "react-toastify";
import SingleUserList from "./SingleUserList";
import Loader from "../Loader";
import InfiniteScroll from "react-infinite-scroll-component";


const Users = () => {

    const { isLoading, setIsLoading, allUserListDContext } = useContext(DContext);

    const [userList, setUserList] = useState([]);
    const [searchByUsernameState, setSearchByUsernameState] = useState(null);


    useEffect(() => {
        localStorage.setItem('userPageNumber', 1);
        getUser();
    }, [searchByUsernameState])

    const getUser = async () => {
        setIsLoading(true);
        const search = searchByUsernameState;
        const pageNumber = 1;
        const type = "all";
        const axiosRes = await allUserListDContext(type, search, pageNumber);
        console.log('axiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === "success") {
            setUserList(axiosRes.list);
        } else {
            toast(axiosRes.message);
        }
        setIsLoading(false);
    }

    // Aggree Modal
    const [showBlock, setShowBlock] = useState(false);
    const BlockClose = () => setShowBlock(false);
    // const BlockShow = () => setShowBlock(true);



    //Search
    const searchTyping = async (event) => {
        const value = event.target.value;
        setSearchByUsernameState(value);
    };



    //Append next post list
    const appendNextList = async () => {
        let currentAdminUserListPage = localStorage.getItem("userPageNumber");
        let pageNumberOfPostList = parseInt(currentAdminUserListPage) + 1;
        const search = searchByUsernameState;
        const type = "all";
        const axiosRes = await allUserListDContext(type, search, pageNumberOfPostList);
        if (axiosRes.status === "success") {
            setUserList((current) => [...current, ...axiosRes.list]);
            localStorage.setItem("userPageNumber", pageNumberOfPostList);
        }
    };


    return (
        <>

            {/* {console.log('userListuserList', userList)} */}
            {isLoading && <Loader />}


            <InfiniteScroll
                dataLength={userList.length}
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

                        <Col lg="4">
                            <h4>All Users</h4>
                        </Col>

                        <Col lg="8">
                            <div className="Titlebar-btns">
                                <div className="sendbtn">
                                    <Link to="/admin/sendnotification">Send Notification</Link>
                                </div>
                                <div className="sendbtn">
                                    <Link to="/admin/blocked-user">Blocked User</Link>
                                </div>
                                <div className="sendbtn">
                                    <Link to="/admin/verification-request-list">Verification Request</Link>
                                </div>
                                <Form.Group className="searchbar" controlId="exampleForm.ControlInput1">
                                    <BiSearch />
                                    <Form.Control type="text"
                                        value={searchByUsernameState}
                                        onChange={searchTyping}
                                        placeholder="Search for users" />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="usertable">
                    <Table size="sm">
                        <thead>
                            <tr>
                                <th>Display Name</th>
                                <th>Username</th>
                                <th>E-mail</th>

                                <th>Email Verified</th>

                                <th>Official Status</th>
                                <th>Phone number</th>
                            </tr>
                        </thead>
                        <tbody>

                            {userList.map((singleUser) => (
                                <SingleUserList key={singleUser._id} singleUser={singleUser} userList={userList} setUserList={setUserList} />
                            ))}

                        </tbody>
                    </Table>
                </div>
            </Container>
            {/* Aggree modal */}
            <Modal className="Admin-modal" show={showBlock} onHide={BlockClose} centered>

                <Modal.Body>
                    <p>Are you sure you want to block this user</p>
                </Modal.Body>
                <Modal.Footer>
                    <div className="text-end">
                        <Button onClick={BlockClose} className="outline-primary text-white">Cancel</Button>
                        <Button onClick={BlockClose} className="bg-primary text-white">Confirm</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Users;