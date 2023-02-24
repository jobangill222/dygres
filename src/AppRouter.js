import { Navigate, Routes, Route } from "react-router-dom";
import Notifications from "./Pages/Notifications";
import New from "./Pages/New";
import Hot from "./Pages/Hot";
import HashTagPosts from "./Pages/HashTagPosts";

import SinglePostDetail from "./Pages/SinglePostDetail";


import MostVoted from "./Pages/MostVoted";
import NotVoted from "./Pages/NotVoted";
import Profile from "./Components/Profile/Profile";
import ProfileTabs from "./Components/Profile/ProfileTabs";
import ProfileTabContent from "./Components/Profile/ProfileTabTimeline";
import SiteLayout from "./Components/Layouts/SiteLayout";
import ProfileLayout from "./Components/Layouts/ProfileLayout";
import EditProfileLayout from "./Components/Layouts/EditProfileLayout";
import AuthLayout from "./Components/Layouts/AuthLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";
// import NoHeaderLayout from "./Components/Layouts/NoHeaderLayout";
import Login from "./Components/AuthPages/Login";
import SignUp from "./Components/AuthPages/SignUp";
import GetOtp from "./Components/AuthPages/GetOtp";
import EnterOtp from "./Components/AuthPages/EnterOtp";
import ResetPassword from "./Components/AuthPages/ResetPassword";
import Dashboard from "./Components/AdminPages/Dashboard";
import Users from "./Components/AdminPages/Users";
import Post from "./Components/AdminPages/Post";
import SendNotification from "./Components/AdminPages/SendNotification";
import FlagPost from "./Components/AdminPages/FlagPost";
import UserVerification from "./Components/AdminPages/UserVerification";
// import TopLatestPost from "./Components/TopLatestPost";
import NotFound from "./Pages/NotFound";
import { useContext, useEffect } from "react";
import { DContext } from "./Context/DContext";
import EditProfile from "./Components/Profile/EditProfile";
import PersonalInformation from "./Components/Profile/PersonalInformation";
import PostHead from "./Components/PostList/PostHead";
import WhatsMind from "./Components/WhatsMind";

import UsersProfile from "./Components/Profile/UsersProfile";

import AwardList from "./Components/AdminPages/Awards/AwardList";
import AddAward from "./Components/AdminPages/Awards/AddAward";
import EditAward from "./Components/AdminPages/Awards/EditAward";

import PackageList from "./Components/AdminPages/Awards/PackageList";
import AddPackage from "./Components/AdminPages/Awards/AddPackage";
import EditPackage from "./Components/AdminPages/Awards/EditPackage";
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";



function AppRouter() {
    // Context Variables
    const { user, userStats, userToken } = useContext(DContext);
    const navigate = useNavigate();
    const location = useLocation();


    useEffect(() => {
        console.log('useruseruser', user)
        if (user && user.role === 'user') {
            let pathName = location.pathname;

            //Email verification
            if (user && user.isEmailVerify === 0 && user.isEmailVerificationReminderSent === 1) {
                if (pathName !== "/personalinformation") {
                    toast('Please verify your email to access site.')
                    navigate('/personalinformation');
                    return
                }
            }

            //Human verification pending
            if (userStats && userStats.totalFollowers > 49000 && user.isPhotoVerify === 0) {
                if (pathName !== "/personalinformation") {
                    toast('Please do image verification to access site.')
                    navigate('/personalinformation');
                    return
                }
            }

            //Verification rejected
            if (userStats && userStats.totalFollowers > 49000 && user.isPhotoVerify === 2) {
                if (pathName !== "/personalinformation") {
                    toast('Please do image verification to access site.')
                    navigate('/personalinformation');
                    return
                }
            }

        }
    }, [user, location]);


    return (
        <>
            <Routes>

                {!userToken ? (
                    <Route element={<AuthLayout />}>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/signup" element={<SignUp />} />
                        <Route exact path="/getotp" element={<GetOtp />} />
                        <Route exact path="/enterotp" element={<EnterOtp />} />
                        <Route exact path="/resetpassword" element={<ResetPassword />} />
                        <Route path="*" element={<Navigate to='/login' />} />
                    </Route>
                ) : (
                    <>
                        {user?.role === 'user' ?
                            <>
                                <Route element={<SiteLayout />}>
                                    <Route exact path="/new" element={<New />} />
                                    <Route exact path="/hot" element={<Hot />} />
                                    <Route exact path="/most-voted" element={<MostVoted />} />
                                    <Route exact path="/not-voted" element={<NotVoted />} />
                                    <Route exact path="/hashtagPosts" element={<HashTagPosts />} />
                                    <Route exact path="/SinglePostDetail/:postIdForSinglePost" element={<SinglePostDetail />} />
                                    <Route exact path="/notification" element={<Notifications />} />
                                    {/* <Route exact path="/not-voted" element={<TopLatestPost />} /> */}
                                    <Route exact path="/posthead" element={<PostHead />} />
                                    <Route exact path="/whatsmind" element={<WhatsMind />} />
                                </Route>
                                <Route element={<ProfileLayout />}>
                                    <Route exact path="/profile" element={<Profile />} />
                                    <Route exact path="/Usersprofile/:userIDForProfile" element={<UsersProfile />} />
                                    <Route exact path="/profiletabs" element={<ProfileTabs />} />
                                    <Route exact path="/profiletabcontent" element={<ProfileTabContent />} />
                                </Route>
                                <Route element={<EditProfileLayout />}>
                                    <Route exact path="/editprofile" element={<EditProfile />} />
                                    <Route exact path="/personalinformation" element={<PersonalInformation />} />
                                </Route>
                                <Route path="*" element={<Navigate to='/new' />} />
                            </> :
                            user?.role === 'admin' ?
                                <>
                                    <Route element={<AdminLayout />}>
                                        <Route exact path="admin/dashboard" element={<Dashboard />} />
                                        <Route exact path="admin/users" element={<Users />} />
                                        <Route exact path="admin/post/:userID" element={<Post />} />
                                        <Route exact path="admin/sendnotification" element={<SendNotification />} />
                                        <Route exact path="admin/flagpost/:userID" element={<FlagPost />} />
                                        <Route exact path="admin/userverification/:userIDForVerification" element={<UserVerification />} />
                                        <Route exact path="admin/awardList" element={<AwardList />} />
                                        <Route exact path="admin/addaward" element={<AddAward />} />
                                        <Route exact path="admin/editaward/:awardID" element={<EditAward />} />
                                        <Route exact path="admin/packagelist" element={<PackageList />} />
                                        <Route exact path="admin/addpackage" element={<AddPackage />} />
                                        <Route exact path="admin/editpackage/:packageID" element={<EditPackage />} />
                                    </Route>
                                    <Route path="*" element={<Navigate to='/admin/dashboard' />} />
                                </>
                                : null
                        }

                    </>
                )}

                {/* <Route path="*" element={<NotFound />} /> */}

            </Routes>
        </>
    );
}

export default AppRouter;
