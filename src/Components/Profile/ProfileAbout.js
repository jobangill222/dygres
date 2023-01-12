import React from 'react';

const ProfileAbout = (props) => {

    //From Global state
    const { user } = props;

    return (
        <>
            <div className='aboutline'>
                <h4>Bio</h4>
                <p>{user?.bio ? user.bio : `No Bio`}</p>
            </div>
            <div className='aboutline'>
                <h4>Phone number</h4>
                <p>{user?.phoneNumber ? user.phoneNumber : `No Phone Number`}</p>
            </div>
            <div className='aboutline'>
                <h4>E-mail</h4>
                <p>{user?.email ? user.email : `No Email`}</p>
            </div>
            <div className='aboutline'>
                <h4>Region</h4>
                <p>{user?.region ? user.region : `No Region`}</p>
            </div>
        </>

    );
}

export default ProfileAbout;