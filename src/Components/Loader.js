import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

export default function Loader() {
    return (
        <div className='loader'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    )
}
