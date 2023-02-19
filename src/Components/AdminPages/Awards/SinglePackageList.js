import React, { useContext } from 'react'
import { BsThreeDotsVertical, BsPencil } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from "react-router-dom";
import { DContext } from "../../../Context/DContext";
import { toast } from "react-toastify";

export default function SinglePackageList(props) {

    const { singlePackage, setPackageListState, packageListState } = props;

    const navigate = useNavigate();

    const { deletePackageAdminDContext } = useContext(DContext);

    const editAward = async (packageID) => {
        navigate("/admin/editpackage/" + packageID);
    }


    const deletePackage = async (packageID) => {
        const axiosDeleteRes = await deletePackageAdminDContext(packageID);
        if (axiosDeleteRes.status === "success") {
            const result = packageListState.filter(award => award._id !== packageID);
            setPackageListState(result);
        }
        else {
            toast(axiosDeleteRes.message);
        }
    }

    return (

        <tr>
            <td>
                <img src={singlePackage?.image ? singlePackage.image : '/images/user-120.png'} alt='icon' />
            </td>
            <td>{singlePackage?.name}</td>
            <td>{singlePackage?.award_details.length}</td>

            <td>
                <div className="number-bar">
                    <p>{singlePackage?.amount}</p>
                    <div className="user-dropdown">
                        <BsThreeDotsVertical />
                        <ul className="Dropdown-listing">

                            <li className="text-secondry" onClick={() => editAward(singlePackage?._id)} >
                                <BsPencil />Edit
                            </li>
                            <li className="text-secondry deltebtn" onClick={() => deletePackage(singlePackage?._id)} >
                                <AiOutlineDelete />Delete
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
        </tr>

    )
}
