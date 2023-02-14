import React from 'react'

export default function PostHeadAward(props) {

    const { award } = props;

    return (
        <>
            <li className="text-whitesure">
                <img src={award.awardDetail[0].image} alt="awards" />{award.awardCount}
            </li>
        </>
    )
}
