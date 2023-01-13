import React, { useContext, useState } from 'react'
import Col from "react-bootstrap/Col";
import { DContext } from "../../Context/DContext";
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';

export default function SinglePackageList(props) {

    const { setSelectedPostIDForAwardPopup, singlePackage, setShowBuyPackages, setAwardPopupOpenStatus } = props;

    const { BuyAwardDContext } = useContext(DContext);

    const [isLoding, setIsLoading] = useState(false);


    const buyPackage = async () => {

        try {
            setIsLoading(true);
            const axiosRes = await BuyAwardDContext(singlePackage._id);
            console.log('axiosRes after get payment link', axiosRes);
            if (axiosRes.status === "success") {
                window.open(axiosRes.link);
                // Hide awards popups when redirect to payment page
                setShowBuyPackages(false)
                setAwardPopupOpenStatus(false)
                // Make postID of award null
                setSelectedPostIDForAwardPopup(null)
            }
            else {
                toast(axiosRes.message);
            }

            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }

    }

    // console.log('singlePackage', singlePackage)
    return (
        <>

            {isLoding &&
                <div className='loader'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>

            }

            <Col className="col-md-4">
                <div className="Awrds-li">
                    {/* <p className="Begde-bar">X100</p> */}
                    <div className="awards-img">
                        <img src={singlePackage?.image} alt="img" />
                    </div>
                    <h5>{singlePackage?.name}</h5>
                    <h3>₹{singlePackage?.amount}</h3>

                    {singlePackage.is_buy === 0 ? <button className="btn-primary" onClick={buyPackage} >Buy</button> : <button className="btn-primary">Purchased</button>}
                    {/* <button onClick={buyPackage} >Buy</button> */}
                </div>
            </Col>

        </>
    )
}
