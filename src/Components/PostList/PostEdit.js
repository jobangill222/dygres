import React, { useState, useContext } from "react";
import { BsPencil } from 'react-icons/bs';
import { ImCross } from 'react-icons/im';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from "react-toastify";
import { DContext } from "../../Context/DContext";
import { MentionsInput, Mention } from 'react-mentions';


const PostEdit = (props) => {

    //DContext
    const { editPostDContext, suggestionWhilePostingDContext } = useContext(DContext);

    //Props
    const { postID, postContent, setPostContent, setIsEditFieldOpen } = props;

    //States
    const [editContent, setEditContent] = useState(postContent);

    const saveEditPost = async () => {
        if (!editContent) {
            toast("Hmm… you might consider entering some text before clicking submit.");
        } else {
            const editPostAxiosRes = await editPostDContext(postID, editContent);
            // console.log('editPostAxiosReseditPostAxiosReseditPostAxiosRes' , editPostAxiosRes);
            if (editPostAxiosRes.status === "success") {
                setPostContent(editContent);
                setIsEditFieldOpen(false)
            }
            else {
                toast(editPostAxiosRes.message);
            }
        }
    }


    //Suggestion of user
    const fetchSuggestionList = async (trigger, query, callback) => {
        // Call your API to fetch matching items based on the trigger and query
        if (trigger === '@') {
            const results = await suggestionWhilePostingDContext(query && query);
            const newArray = results.list.map(item => {
                return {
                    id: item._id,
                    profileImage: item?.profileImage ? item.profileImage : '/images/user.png',
                    display: item.username
                };
            });
            callback(newArray);

        } else if (trigger === '#') {
            const results = await suggestionWhilePostingDContext("#" + query);
            const newArray = results.list.map(item => {
                return {
                    id: item._id,
                    display: item.name
                };
            });
            callback(newArray);
        }
    };


    const handleUserSuggestion = (id, display) => {
        setEditContent(editContent.replace(/@[^\s]*\s?$/, `@${display} `));
    };
    const handleHashSuggestion = (id, display) => {
        setEditContent(editContent.replace(/#[^\s]*\s?$/, `${display} `));
    };

    return (
        <>
            <div className="user-edit">
                <h4><BsPencil />Edit Post</h4>
                <Form>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlTextarea1">
                        {/* <Form.Control as="textarea" style={{ height: '120px' }} value={editContent} onChange={(e) => setEditContent(e.target.value)} /> */}

                        <MentionsInput
                            className='whatsmind-inputbar'
                            as="textarea"
                            rows={6}
                            maxLength={420}
                            name="content"
                            value={editContent}
                            max="420"
                            onChange={(e) => setEditContent(e.target.value)}
                        >
                            <Mention
                                trigger='@'
                                data={(query, callback) => fetchSuggestionList('@', query, callback)}
                                onAdd={handleUserSuggestion}
                                displayTransform={(id, display) => `@${display + ' '}`}
                                renderSuggestion={(
                                    suggestion,
                                    search,
                                    highlightedDisplay,
                                    index,
                                    focused
                                ) => (
                                    <div className={`user-suggestion ${focused ? 'focused' : ''}`}>
                                        <img src={suggestion.profileImage} />
                                        <div className="user-suggestion-details">
                                            <div className="user-suggestion-name">{highlightedDisplay}</div>
                                        </div>
                                    </div>
                                )}
                            />


                            <Mention
                                trigger='#'
                                data={(query, callback) => fetchSuggestionList('#', query, callback)}
                                onAdd={handleHashSuggestion}
                                displayTransform={(id, display) => `#${display + ' '}`}
                                renderSuggestion={(
                                    suggestion,
                                    search,
                                    highlightedDisplay,
                                    index,
                                    focused
                                ) => (
                                    <div className={`user-suggestion ${focused ? 'focused' : ''}`}>
                                        <div className="user-suggestion-details">
                                            <div className="user-suggestion-name">{highlightedDisplay}</div>
                                        </div>
                                    </div>
                                )}
                            />

                        </MentionsInput>

                        <div className="text-end">
                            <Button className="outline-primary text-white" onClick={() => setIsEditFieldOpen(false)}><ImCross />Cancel</Button>
                            <Button className="bg-primary text-white" onClick={saveEditPost} >Save</Button>
                        </div>
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}

export default PostEdit;