import React from 'react'
// import { highlightName } from "../../helper/highlightName";

import HighLight from '../HighLight';

export default function ThreadContent(props) {

    const { content } = props;

    // const finalPostContent = highlightName(content);

    return (

        <>
            <div className="Description-bar">
                {/* <p>{finalPostContent}</p> */}
                <HighLight content={content} />
            </div>
        </>
    )
}
