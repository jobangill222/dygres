import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assets/Css/style.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './Pages/Dashboard';
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

function App() {

  return (
    <>
      <ThemeProvider>

        <Router>

          <Routes>


            <Route element={<SiteLayout />}>
              <Route exact path='/' element={<New />} />
              <Route exact path='/new' element={<New />} />
              <Route exact path='/login' element={<Dashboard />} />
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
            </Route>


          </Routes>

        </Router>

      </ThemeProvider>
    </>
  );
}

export default App;
