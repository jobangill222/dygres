import React, { useState, useEffect, useContext } from 'react'
import { MdBlock } from 'react-icons/md';
import { Link } from "react-router-dom";
import { DContext } from "../../Context/DContext";

export default function BlockUser(props) {

    const { userID, isBlock, isBlockState, setIsBlockState } = props;

    const { blockUnblockUserDContext } = useContext(DContext);


    useEffect(() => {
        if (isBlock === 1) {
            setIsBlockState(true)
        } else {
            setIsBlockState(false)
        }

    }, [isBlock])


    const submitHandler = async () => {
        const axiosRes = await blockUnblockUserDContext(userID)
        console.log('axiosResaxiosRes', axiosRes)
        if (axiosRes.action === 'block') {
            setIsBlockState(true)
        } else {
            setIsBlockState(false)
        }
    }

    return (
        <li className="text-secondry">

            {isBlockState ?
                <>
                    <Link onClick={submitHandler}>
                        <MdBlock />UnBlock
                    </Link>
                </>
                : <>
                    <Link onClick={submitHandler} >
                        <MdBlock />Block
                    </Link>
                </>
            }
        </li>
    )
}
