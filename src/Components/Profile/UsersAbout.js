import React from 'react';

const ProfileAbout = (props) => {

    //From Global state
    const { otherUser } = props;

    return (
        <>
            <div className='aboutline'>
                <h4>Bio</h4>
                <p>{otherUser?.bio ? otherUser.bio : `No Bio`}</p>
            </div>
            {/* <div className='aboutline'>
                <h4>Phone number</h4>
                <p>{otherUser?.phoneNumber ? otherUser.phoneNumber : `No Phone Number`}</p>
            </div>
            <div className='aboutline'>
                <h4>E-mail</h4>
                <p>{otherUser?.email ? otherUser.email : `No Email`}</p>
            </div>
            <div className='aboutline'>
                <h4>Region</h4>
                <p>{otherUser?.region ? otherUser.region : `No Region`}</p>
            </div> */}
        </>

    );
}

export default ProfileAbout;