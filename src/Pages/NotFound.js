import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";

const NotFound = () => {
    return (
        <>
            <div className="notfound">
                <Container>
                    <Row>
                        <Col lg="12">
                            <div className="notfound-content">
                                <h2>404</h2>
                                <h4>Opps! Page Not Found</h4>
                                <p>Sorry, the page you're looking for doesn't exist.</p>

                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default NotFound;