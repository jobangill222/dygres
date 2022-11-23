import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/Css/style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from './hooks/useThemeContext';
import Notifications from './Pages/Notifications';
import New from './Pages/New';
import Hot from './Pages/Hot';
import MostVoted from './Pages/MostVoted';
import NotVoted from './Pages/NotVoted';
import Profile from './Components/Profile/Profile';
import ProfileTabs from './Components/Profile/ProfileTabs';
import ProfileTabContent from './Components/Profile/ProfileTabTimeline';
import EditProfile from './Components/Profile/EditProfile';
import SiteLayout from './Components/Layouts/SiteLayout';
import ProfileLayout from './Components/Layouts/ProfileLayout';
import Login from './Components/AuthLayout/Login';
import SignUp from './Components/AuthLayout/SignUp';
import GetOtp from './Components/AuthLayout/GetOtp';
import EnterOtp from './Components/AuthLayout/EnterOtp';
import ResetPassword from './Components/AuthLayout/ResetPassword';

function App() {

  return (
    <>
      <ThemeProvider>

        <Router>

          <Routes>


            <Route element={<SiteLayout />}>
              <Route exact path='/' element={<New />} />
              <Route exact path='/new' element={<New />} />
              <Route exact path='/hot' element={<Hot />} />
              <Route exact path='/most-voted' element={<MostVoted />} />
              <Route exact path='/notification' element={<Notifications />} />
              <Route exact path='/not-voted' element={<NotVoted />} />
            </Route>


            <Route element={<ProfileLayout />}>
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/profiletabs' element={<ProfileTabs />} />
              <Route exact path='/profiletabcontent' element={<ProfileTabContent />} />
              <Route exact path='/editprofile' element={<EditProfile />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<SignUp />} />
              <Route exact path='/getotp' element={<GetOtp />} />
              <Route exact path='/enterotp' element={<EnterOtp />} />
              <Route exact path='/resetpassword' element={<ResetPassword />} />
            </Route>


          </Routes>

        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;
