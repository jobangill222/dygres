import React from 'react'
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';


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
                <Row>
                    <Col lg="12">
                      <div className='flexbar'>
                      <ul className='admintable-tabs'>
                        <li><Link className='tabbtn active' to='/'>Awards</Link></li>
                        <li><Link className='tabbtn' to='/'>Packages</Link></li>
                       </ul>
                       <ul className='admintable-tabs'>
                        <li><Link className='addbtn' to='/admin/addaward'>+Add award</Link></li>
                       </ul>
                      </div>
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
                                                <BsPencil />Edit
                                            </li>
                                            <li className="text-secondry deltebtn" >
                                                <AiOutlineDelete />Delete
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
