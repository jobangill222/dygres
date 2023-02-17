import React, { useContext } from 'react'
import { BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { DContext } from "../../../Context/DContext";
import { toast } from "react-toastify";

export default function SingleAwardList(props) {

    const { singleAward, setAwardListState, awardListState } = props;

    const navigate = useNavigate();

    const { deleteAwardDContext } = useContext(DContext);

    const editAward = async (awardID) => {
        navigate("/admin/editaward/" + awardID);
    }


    const deleteAward = async (awardID) => {
        const axiosDeleteRes = await deleteAwardDContext(awardID);
        if (axiosDeleteRes.status === "success") {
            const result = awardListState.filter(award => award._id !== awardID);
            setAwardListState(result);
        }
        else {
            toast(axiosDeleteRes.message);
        }
    }

    return (

        <tr>
            <td>
                <img src={singleAward?.image ? singleAward.image : '/images/user-120.png'} alt='icon' />
            </td>
            <td>{singleAward?.name}</td>
            <td>
                <div className="number-bar">
                    <p>{singleAward?.status}</p>
                    <div className="user-dropdown">
                        <BsThreeDotsVertical />
                        <ul className="Dropdown-listing">

                            <li className="text-secondry" onClick={() => editAward(singleAward?._id)} >
                                <BsPencil />Edit
                            </li>
                            <li className="text-secondry deltebtn" onClick={() => deleteAward(singleAward?._id)} >
                                <AiOutlineDelete />Delete
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>

    )
}
