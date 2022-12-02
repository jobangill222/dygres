import React from "react";
import { AiFillHome } from 'react-icons/ai';
import { BsPlus } from 'react-icons/bs';
import { Link } from "react-router-dom";


const FooterMob = () => {
    return (
        <>
            <div className="Mob-Footerbar">
                <ul className="mob-foot-menu">
                    <li><Link exact to="/new"><AiFillHome /></Link></li>
                    <li className="Addpost"><Link exact to="/whatsmind"><BsPlus /></Link></li>
                    <li><Link exact to="/profile"><img src="/images/user.png" alt="user-main-img" /></Link></li>
                </ul>
            </div>
        </>
    );
}

export default FooterMob;