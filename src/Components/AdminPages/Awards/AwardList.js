import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import Loader from "../../Loader";


import { DContext } from "../../../Context/DContext";
import SingleAwardList from "./SingleAwardList";

export default function AwardList() {

    const { isLoading, setIsLoading, getAwardListDContext } = useContext(DContext);

    useEffect(() => {
        setIsLoading(true);
        getAwards();
    }, []);


    const [awardListState, setAwardListState] = useState([]);
    const getAwards = async () => {
        const type = 'all';
        const axiosRes = await getAwardListDContext(type);
        if (axiosRes.status === "success") {
            setAwardListState(axiosRes.list);
        }
        setIsLoading(false);
    }

    return (
        <Container>
            {isLoading && <Loader />}

            {/* {console.log('awardListState', awardListState)} */}
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
                                <li><Link className='tabbtn' to='/admin/packagelist'>Packages</Link></li>
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

                        {awardListState.length ? awardListState.map((singleAward) => (
                            <SingleAwardList key={singleAward._id} singleAward={singleAward} awardListState={awardListState} setAwardListState={setAwardListState} />
                        )) : <div className="empty-bar">
                            <img src="/images/empty.png" alt='dummy' />
                            <h4>Empty List</h4>
                        </div>}



                    </tbody>
                </Table>
            </div>
        </Container>
    )
}
