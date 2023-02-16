import React from 'react'

import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { BsThreeDotsVertical, BsFlag } from 'react-icons/bs';
// import { MdBlock } from 'react-icons/md';
import { BiIdCard } from 'react-icons/bi';


export default function AwardList() {
    return (
        <Container>

            <div className="dashboard-title-bar">
                <Row>
                    <Col lg="6">
                        <h4>Awards</h4>
                    </Col>
                    <Col lg="6">

                    </Col>
                </Row>
            </div>


            <div className="usertable">
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Award Image</th>
                            <th>Award Name</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>
                                <img src='/images/user-120.png' alt='icon' />
                            </td>
                            <td>Award 1</td>
                            <td>
                                <div className="number-bar">
                                    <p>Free</p>
                                    <div className="user-dropdown">
                                        <BsThreeDotsVertical />
                                        <ul className="Dropdown-listing">

                                            <li className="text-secondry" >
                                                <BsFlag />Edit
                                            </li>
                                            <li className="text-secondry" >
                                                <BiIdCard />Delete
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
