import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/Css/style.css";
import { Navigate, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useThemeContext";
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
import NoHeaderLayout from "./Components/Layouts/NoHeaderLayout";
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
import TopLatestPost from "./Components/TopLatestPost";
import NotFound from "./Pages/NotFound";
import { useContext } from "react";
import { DContext } from "./Context/DContext";
import { ToastContainer } from "react-toastify";
import EditProfile from "./Components/Profile/EditProfile";
import PersonalInformation from "./Components/Profile/PersonalInformation";
import PostHead from "./Components/PostList/PostHead";
import WhatsMind from "./Components/WhatsMind";

import UsersProfile from "./Components/Profile/UsersProfile";
import { DProvider } from "./Context/DContext";


function App() {
  // Context Variables
  const { userToken } = useContext(DContext);

  return (
    <>
      <ThemeProvider>
        <Router>
          <DProvider>

          </DProvider>
          <Routes>
            {/* {console.log('check the user state context - ', userToken)} */}

            <Route element={<NoHeaderLayout />}>
              <Route exact path="/notfound" element={<NotFound />} />
            </Route>


            {!userToken ? (
              <Route element={<AuthLayout />}>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/getotp" element={<GetOtp />} />
                <Route exact path="/enterotp" element={<EnterOtp />} />
                <Route
                  exact
                  path="/resetpassword"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<Navigate to='/login' />} />

              </Route>
            ) : (
              <>
                <Route element={<SiteLayout />}>
                  <Route path="*" element={<Navigate to='/new' />} />

                  <Route exact path="/new" element={<New />} />
                  <Route exact path="/hot" element={<Hot />} />
                  <Route exact path="/most-voted" element={<MostVoted />} />
                  <Route exact path="/not-voted" element={<NotVoted />} />
                  <Route exact path="/hashtagPosts" element={<HashTagPosts />} />
                  <Route exact path="/SinglePostDetail" element={<SinglePostDetail />} />

                  <Route exact path="/notification" element={<Notifications />} />
                  {/* <Route exact path="/not-voted" element={<TopLatestPost />} /> */}
                  <Route exact path="/posthead" element={<PostHead />} />
                  <Route exact path="/whatsmind" element={<WhatsMind />} />

                </Route>

                <Route element={<ProfileLayout />}>
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/Usersprofile" element={<UsersProfile />} />

                  <Route exact path="/profiletabs" element={<ProfileTabs />} />
                  <Route
                    exact
                    path="/profiletabcontent"
                    element={<ProfileTabContent />}
                  />
                </Route>

                <Route element={<EditProfileLayout />}>
                  <Route exact path="/editprofile" element={<EditProfile />} />
                  <Route
                    exact
                    path="/personalinformation"
                    element={<PersonalInformation />}
                  />
                </Route>




              </>
            )}

            <Route element={<AdminLayout />}>
              <Route exact path="admin/dashboard" element={<Dashboard />} />
              <Route exact path="admin/users" element={<Users />} />
              <Route exact path="admin/post" element={<Post />} />
              <Route exact path="admin/sendnotification" element={<SendNotification />} />
              <Route exact path="admin/flagpost" element={<FlagPost />} />
              <Route exact path="admin/userverification" element={<UserVerification />}
              />
            </Route>

            <Route path="*" element={<NotFound />} />


          </Routes>
        </Router>
      </ThemeProvider>

      <ToastContainer />
    </>
  );
}

export default App;
