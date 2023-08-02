import React from 'react'
// import { highlightName } from "../../helper/highlightName";
import ShowPostText from "../ShowPostAsPlainText";

// import HighLight from '../../HighLight';

export default function ThreadContent(props) {

    const { content } = props;

    // const finalPostContent = highlightName(content);
    // const lines = content.split('\n');


    return (

        <>
            <div className="Description-bar">
                {/* {lines.map((line, index) => (
                    <React.Fragment key={index}> 
                        <HighLight key={index} content={line} />
                        {line === "" ?
                            <br />
                            : null
                        } 
                    </React.Fragment>
                ))} */}
                <ShowPostText postContent={content ? content : "loading"} />

            </div>
        </>
    )
}
