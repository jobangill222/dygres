import React, { useEffect, useState, useContext } from 'react'
import { BsThreeDotsVertical, BsFilePost, BsFlag } from 'react-icons/bs';
// import { MdBlock } from 'react-icons/md';
import { BiIdCard } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { DContext } from "../../Context/DContext";
import { MdBlock } from 'react-icons/md';


export default function BlockedSingleUserList(props) {

    const { singleUser, blockedUserList, setBlockedUserList } = props;

    const { officialUnofficialUserAdminDContext, blockUnblockUserDContext } = useContext(DContext);

    const navigate = useNavigate();

    const goToUserVerification = async (userIDForVerification) => {
        navigate('/admin/userverification/' + userIDForVerification)
    }


    const userDetails = async (userID) => {
        navigate('/admin/post/' + userID)
    }

    const usersFlaggedPost = async (userID) => {
        navigate('/admin/flagpost/' + userID)
    }


    const [isOfficialState, setIsOfficialState] = useState(false);
    const [isBlockState, setIsBlockState] = useState(false);

    useEffect(() => {
        if (singleUser?.isOfficial && singleUser?.isOfficial === 1) {
            setIsOfficialState(true)
        }
        if (singleUser.isBlock === 1) {
            setIsBlockState(true);
        }
    }, [])

    const isOfficialToggle = async () => {
        const axiosRes = await officialUnofficialUserAdminDContext(singleUser._id);
        if (axiosRes.action === "un-official") {
            setIsOfficialState(false)
        } else {
            setIsOfficialState(true)
        }
    }





    const blockSubmitHandler = async () => {
        // const axiosRes = await blockUnblockUserDContext(singleUser?._id)
        // console.log('axiosResaxiosRes', axiosRes)

        const result = blockedUserList.filter(user => user._id !== singleUser?._id);
        setBlockedUserList(result);

        console.log('blockedUserListblockedUserList', blockedUserList)
    }


    return (
        <>
            <tr>
                <td>{singleUser?.name ? singleUser.name : 'No Name'} </td>
                <td>{singleUser?.username}</td>
                <td>{singleUser?.email}</td>
                <td onClick={isOfficialToggle} >
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        checked={isOfficialState}
                    />
                </td>
                <td>
                    <div className="number-bar">
                        <p>{singleUser?.phoneNumber ? singleUser.phoneNumber : "No Phone Number"}</p>
                        <div className="user-dropdown">
                            <BsThreeDotsVertical />
                            <ul className="Dropdown-listing">
                                {/* <li className="text-secondry">
                                    <Link ><MdBlock />Block</Link>
                                </li> */}

                                <li className="text-secondry">
                                    {isBlockState ?
                                        <>
                                            <Link onClick={blockSubmitHandler}>
                                                <MdBlock />UnBlock
                                            </Link>
                                        </>
                                        : <>
                                            <Link onClick={blockSubmitHandler} >
                                                <MdBlock />Block
                                            </Link>
                                        </>
                                    }
                                </li>

                                <li className="text-secondry" onClick={() => userDetails(singleUser._id)} >
                                    {/* <Link to="/admin/post"><BsFilePost />Posts</Link> */}
                                    <Link><BsFilePost />Posts</Link>
                                </li>
                                <li className="text-secondry" onClick={() => usersFlaggedPost(singleUser._id)}>
                                    <BsFlag />Flagged Posts
                                </li>
                                <li className="text-secondry" onClick={() => goToUserVerification(singleUser?._id)}>
                                    {/* <Link to="/admin/userverification"><BiIdCard />User Verification</Link> */}
                                    <BiIdCard />User Verification
                                </li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>
        </>
    )
}
