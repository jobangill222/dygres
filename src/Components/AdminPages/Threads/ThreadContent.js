import React from 'react'
// import { highlightName } from "../../helper/highlightName";

import HighLight from '../../HighLight';

export default function ThreadContent(props) {

    const { content } = props;

    // const finalPostContent = highlightName(content);
    const lines = content.split('\n');


    return (

        <>
            <div className="Description-bar">
                {/* <p>{finalPostContent}</p> */}
                {/* <p><HighLight content={content} /></p> */}
                {lines.map((line, index) => (
                    <React.Fragment key={index}>
                        {/* {line} */}
                        <HighLight key={index} content={line} />
                        {line === "" ?
                            <br />
                            : null
                        }
                        {/* <br /> */}
                    </React.Fragment>
                ))}
            </div>
        </>
    )
}
