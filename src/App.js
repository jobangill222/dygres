import React, { useContext } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Assets/Css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/useThemeContext";
import Notifications from "./Pages/Notifications";
import New from "./Pages/New";
import Hot from "./Pages/Hot";
import MostVoted from "./Pages/MostVoted";
import NotVoted from "./Pages/NotVoted";
import Profile from "./Components/Profile/Profile";
import ProfileTabs from "./Components/Profile/ProfileTabs";
import ProfileTabContent from "./Components/Profile/ProfileTabTimeline";
import EditProfile from "./Components/Profile/EditProfile";
import SiteLayout from "./Components/Layouts/SiteLayout";
import ProfileLayout from "./Components/Layouts/ProfileLayout";
import AuthLayout from "./Components/Layouts/AuthLayout";
import AdminLayout from "./Components/Layouts/AdminLayout";
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
import { ToastContainer } from "react-toastify";

// Context
import { DContext } from "./Context/DContext";

function App() {
  // Context Variables
  const { userToken } = useContext(DContext);

  return (
    <>
      <ThemeProvider>
        <Router>
          <Routes>
            {/* {console.log('check the user state context - ', userToken)} */}

            {!userToken ? (
              <Route element={<AuthLayout />}>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/signup" element={<SignUp />} />
                <Route exact path="/getotp" element={<GetOtp />} />
                <Route exact path="/enterotp" element={<EnterOtp />} />
                <Route
                  exact
                  path="/resetpassword"
                  element={<ResetPassword />}
                />
              </Route>
            ) : (
              <>
                <Route element={<SiteLayout />}>
                  {/* <Route exact path='/' element={<New />} /> */}
                  <Route exact path="/new" element={<New />} />
                  <Route exact path="/hot" element={<Hot />} />
                  <Route exact path="/most-voted" element={<MostVoted />} />
                  <Route
                    exact
                    path="/notification"
                    element={<Notifications />}
                  />
                  <Route exact path="/not-voted" element={<NotVoted />} />
                  <Route exact path="/not-voted" element={<TopLatestPost />} />
                </Route>

                <Route element={<ProfileLayout />}>
                  <Route exact path="/profile" element={<Profile />} />
                  <Route exact path="/profiletabs" element={<ProfileTabs />} />
                  <Route
                    exact
                    path="/profiletabcontent"
                    element={<ProfileTabContent />}
                  />
                  <Route exact path="/editprofile" element={<EditProfile />} />
                </Route>

                <Route element={<AdminLayout />}>
                  <Route exact path="/dashboard" element={<Dashboard />} />
                  <Route exact path="/users" element={<Users />} />
                  <Route exact path="/post" element={<Post />} />
                  <Route
                    exact
                    path="/sendnotification"
                    element={<SendNotification />}
                  />
                  <Route exact path="/flagpost" element={<FlagPost />} />
                  <Route
                    exact
                    path="/userverification"
                    element={<UserVerification />}
                  />
                </Route>
              </>
            )}
          </Routes>
        </Router>
      </ThemeProvider>

      <ToastContainer />
    </>
  );
}

export default App;
