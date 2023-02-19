import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Loader from "../../Loader";

import { DContext } from "../../../Context/DContext";

import SinglePackageList from "./SinglePackageList";

export default function PackageList() {
    const { isLoading, setIsLoading, getAllPackageListAdminDContext } = useContext(DContext);

    useEffect(() => {
        setIsLoading(true);
        getPackageList();
    }, []);


    const [packageListState, setPackageListState] = useState([]);
    const getPackageList = async () => {
        const axiosRes = await getAllPackageListAdminDContext();
        console.log('axiosResaxiosResaxiosResaxiosRes', axiosRes)
        if (axiosRes.status === "success") {
            setPackageListState(axiosRes.list);
        }
        setIsLoading(false);
    }

    return (
        <Container>
            {isLoading && <Loader />}

            {/* {console.log('packageListStatepackageListStatepackageListState', packageListState)} */}
            <div className="dashboard-title-bar">
                <Row>
                    <Col lg="6">
                        <h4>Add package</h4>
                    </Col>
                    <Col lg="6">

                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <div className='flexbar'>
                            <ul className='admintable-tabs'>
                                <li><Link className='tabbtn ' to='/admin/awardList'>Awards</Link></li>
                                <li><Link className='tabbtn active' to='/'>Packages</Link></li>
                            </ul>
                            <ul className='admintable-tabs'>
                                <li><Link className='addbtn' to='/admin/addpackage'>+Add Package</Link></li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </div>


            <div className="usertable">
                <Table size="sm">
                    <thead>
                        <tr>
                            <th>Package Image</th>
                            <th>Package Name</th>
                            <th>No. Of Awards</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>

                        {packageListState.length ? packageListState.map((singlePackage) => (
                            <SinglePackageList key={singlePackage._id} singlePackage={singlePackage} packageListState={packageListState} setPackageListState={setPackageListState} />
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
