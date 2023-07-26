import React, { useContext, useState } from "react";
import { AiFillHome } from 'react-icons/ai';
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";
import { AiOutlineEye } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import DeleteAccountModal from "../Modals/DeleteAccountModal";
import { AiFillDelete } from 'react-icons/ai';
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { MdHowToVote } from "react-icons/md";
import { BiLayerMinus } from "react-icons/bi";

const FooterMob = () => {

    const navigate = useNavigate();

    const { user, userToken, setUser, setUserToken } = useContext(DContext);

    const [isDeleteAccountState, setIsDeleteAccountState] = useState(false);
    const deleteAccount = async () => {
        setIsDeleteAccountState(true)
    }

    //Logout Functionality
    const logoutHandler = async (e) => {
        // console.log("logout handler call");
        setUser(null);
        setUserToken(null);
        // localStorage.clear();
        localStorage.removeItem("accessToken");
        navigate("/login");
    };
    //End logout functionality

    return (
        <>

            {isDeleteAccountState && <DeleteAccountModal isDeleteAccountState={isDeleteAccountState} setIsDeleteAccountState={setIsDeleteAccountState} />}

            {userToken ? (
                <div className="Mob-Footerbar">
                    <ul className="mob-foot-menu">
                        <li><Link exact to="/new"><AiFillHome /></Link></li>
                        <li className="Addpost"><Link exact to="/whatsmind"><BsPlusCircle/></Link></li>
                        <li className="relative user-dropdown">
                            <img
                                src={
                                    user?.profileImage
                                        ? user.profileImage
                                        : '/images/user.png'
                                }
                                alt="user-img"
                            />
                            
                            <div className="Dropdown-listing bg-white">
                                <div className="arrowshape"></div>
                                {/* <h4 className="text-silver">Account</h4> */}
                                <ul>
                                    <li className="text-secondry">
                                        <Link to="/profile">
                                            <AiOutlineEye />
                                            View Profile
                                        </Link>
                                    </li>
                                    <li className="text-secondry">
                                        <Link to="/editprofile">
                                            <BsPencil />
                                            Edit Profile
                                        </Link>
                                    </li>

                                    <li className="text-secondry" onClick={deleteAccount} >
                                        {/* <Link to="/editprofile"> */}
                                        <AiFillDelete />
                                        Delete Account
                                        {/* </Link> */}
                                    </li>

                                    <li className="text-secondry" onClick={logoutHandler}>
                                        <MdLogout />
                                        Log Out
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            ) : <div></div>}
        </>
    );
}

export default FooterMob;