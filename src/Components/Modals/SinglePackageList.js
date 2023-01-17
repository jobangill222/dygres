import React, { useContext, useState } from 'react'
import Col from "react-bootstrap/Col";
import { DContext } from "../../Context/DContext";
import Spinner from 'react-bootstrap/Spinner';
import { toast } from 'react-toastify';
import AwardListOfPackageModal from "./AwardListOfPackageModal";

export default function SinglePackageList(props) {

    const { setSelectedPostIDForAwardPopup, singlePackage, setShowBuyPackages, setAwardPopupOpenStatus } = props;

    // console.log('singlePackage', singlePackage);

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



    const [viewAwardOfPackageState, setViewAwardOfPackageState] = useState(false);
    const viewAwardOfPackage = async () => {
        setViewAwardOfPackageState(true)
    }

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
                        <p>Package of {singlePackage.award_details.length}</p>
                        <img src={singlePackage?.image} alt="img" />
                    </div>
                    <h5>{singlePackage?.name}</h5>
                    <h3>₹{singlePackage?.amount}</h3>

                    <h6 onClick={viewAwardOfPackage} className="award_of_package" >View award</h6>

                    {viewAwardOfPackageState && <AwardListOfPackageModal viewAwardOfPackageState={viewAwardOfPackageState} setViewAwardOfPackageState={setViewAwardOfPackageState} awardOfPackage={singlePackage.award_details} />}

                    {/* {singlePackage.is_buy === 0 ? <button className="btn-primary" onClick={buyPackage} >Buy</button> : <button className="btn-primary">Purchased</button>} */}
                    {singlePackage.is_buy === 0 ? <button className="btn-primary" onClick={buyPackage} >Buy</button> : <button className="btn-primary" onClick={buyPackage} >Buy</button>}
                </div>
            </Col>

        </>
    )
}
