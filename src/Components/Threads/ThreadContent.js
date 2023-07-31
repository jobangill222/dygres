import React from 'react'
// import { highlightName } from "../../helper/highlightName";

// import HighLight from '../HighLight';
import ShowPostText from "../TextEditor/ShowPostAsPlainText";

export default function ThreadContent(props) {

    const { content } = props;

    // const finalPostContent = highlightName(content);

    // const lines = content.split('\n');

    return (

        <>
            <div className="Description-bar">

                <ShowPostText postContent={content ? content : "loading"} />

                {/* {lines.map((line, index) => (
                    <React.Fragment key={index}> 
                        <HighLight key={index} content={line} />
                        {line === "" ?
                            <br />
                            : null
                        } 
                    </React.Fragment>
                ))} */}
            </div>
        </>
    )
}
