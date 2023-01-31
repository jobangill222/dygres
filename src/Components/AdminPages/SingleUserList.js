import React from 'react'
import { BsThreeDotsVertical, BsFilePost, BsFlag } from 'react-icons/bs';
import { MdBlock } from 'react-icons/md';
import { BiIdCard, BiSearch } from 'react-icons/bi';
import { Link } from "react-router-dom";

export default function SingleUserList() {


    return (
        <>
            <tr>
                <td>Hannah Koph </td>
                <td>@iamhannah</td>
                <td>hannah@gmail.com</td>
                <td>
                    <div className="number-bar">
                        <p>+91 9874563210</p>
                        <div className="user-dropdown">
                            <BsThreeDotsVertical />
                            <ul className="Dropdown-listing">
                                <li className="text-secondry">
                                    {/* <Link onClick={BlockShow}><MdBlock />Block</Link> */}
                                    <Link ><MdBlock />Block</Link>
                                </li>
                                <li className="text-secondry">
                                    <Link to="/admin/post"><BsFilePost />Posts</Link>
                                </li>
                                <li className="text-secondry">
                                    <Link to="/admin/flagpost"><BsFlag />Flagged Posts</Link>
                                </li>
                                <li className="text-secondry">
                                    <Link to="/admin/userverification"><BiIdCard />User Verification</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}
