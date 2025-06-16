import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'remixicon/fonts/remixicon.css'
import LandingNavbar from './Components/Navbar/LandingNavbar';
import CitizenLogin from './Components/Citizen/CitizenLogin';
import PoliceLogin from './Components/Police/PoliceLogin';
import ScrbLogin from './Components/Scrb/ScrbLogin';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import CitizenRegistration from './Components/Citizen/CitizenRegistration';
import About from './Components/Common/About';
import Services from './Components/Common/Services';
import Footer from './Components/Footer/Footer';
import PoliceRegister from './Components/Police/PoliceRegister';
import ForgotPassword from './Components/Common/ForgotPassword';
import CitizenProfile from './Components/Citizen/CitizenProfile';
import ScrollToTop from './Components/Common/ScrollToTop';
import Navbar from './Components/Navbar/Navbar';
import CitizenLandingPage from './Components/Citizen/CitizenLandingPage';
import Banner from './Components/Common/Banner';
import Home from './Components/Common/Home';
import Footer2 from './Components/Footer/Footer2';
import AdminLogin from './Components/Admin/AdminLogin';
import LoginBanner from './Components/Common/LoginBanner';
import UserNavbar from './Components/Navbar/UserNavbar';
import NavbarCall from './Components/Navbar/NavbarCall';
import PoliceRecentCrimes from './Components/Police/PoliceRecentCrimes';
import PoliceLandingPageContent from'./Components/Police/PoliceLandingPageContent';
import PoliceNavbar from './Components/Navbar/PoliceNavbar';
import AdminHome from './Components/Admin/AdminHome';
import AdminSidebar from './Components/Admin/AdminSidebar';
import AdminDashboard from './Components/Admin/AdminDashboard';
import AdminMain from './Components/Admin/AdminMain';
import NewPoliceStationReq from './Components/Police/NewPoliceStationReq';
import PoliceViewCases from './Components/Police/PoliceViewCases';
import CaseDetails from './Components/Police/CaseDetails';
import ScrbForgetpswd from './Components/Scrb/ScrbForgetpswd';
import ReportCrime from './Components/Citizen/ReportCrime';
import ScrbSidebar from './Components/Scrb/ScrbSidebar';
import ScrbDashboard from './Components/Scrb/ScrbDashboard';
import ScrbMain from './Components/Scrb/ScrbMain';
import PoliceProfile from './Components/Police/PoliceProfile';
import ViewAllPoliceStation from './Components/Police/ViewAllPoliceStation';
import LoginNav from './Components/Navbar/LoginNav';
import UpdateCrimeReport from './Components/Citizen/UpdateCrimeReport';
import CitizenAddComplaint from './Components/Citizen/CitizenAddComplaint';
import AddCaseUpdate from './Components/Police/AddCaseUpdate';
import ViewCrimeReport from './Components/Citizen/ViewCrimeReport';
import ViewCrimeDetails from './Components/Citizen/ViewCrimeDetails';
import CrimeReportwithStatus from './Components/Citizen/CrimeReportwithStatus';
import ViewCrimeStatus from './Components/Citizen/ViewCrimeStatus';
import CitizenViewNotification from './Components/Citizen/CitizenViewNotification';
import AdminNavbar from './Components/Navbar/AdminNavbar';
import ContactUs from './Components/Common/ContactUs';
import CitizenViewPolice from './Components/Citizen/CitizenViewPolice';
import PoliceViewCaseUpdates from './Components/Police/PoliceViewCaseUpdates';
import PoliceViewAlerts from './Components/Police/PoliceViewAlerts';
import ReportCrimeForm from './Components/Common/ReportCrimeForm';


function App() {
  return (
    <BrowserRouter basename='crime_reporting' >
      <ScrollToTop/>
      {/* <Navbar/> */}
    <div className="App">
      <Routes>
        <Route path='/' element={[<LandingNavbar/>,<Home/>,<Footer/>,<Footer2/>]} />
        <Route path='/about' element={[<LandingNavbar/>,<About/>,<Services/>,<Footer/>,<Footer2/>]} />
        <Route path='/contact' element={[<LandingNavbar/>,<ContactUs/>,<Footer/>,<Footer2/>]} />

        {/* Citizen  */}

        <Route path='/citizen_login' element={[<LandingNavbar/>,<CitizenLogin/>,<Footer/>,<Footer2/>]} />
        <Route path='/citizen_forgotpassword' element={[<LandingNavbar/>,<ForgotPassword activeUser='Citizen' />,<Footer/>,<Footer2/>]} />
        <Route path='/citizen_register' element={[<LandingNavbar/>,<CitizenRegistration/>,<Footer/>,<Footer2/>]} />
        <Route path='/citizen_home' element={[<UserNavbar/>,<LoginBanner user='citizen' />,<CitizenLandingPage/>,<Footer/>,<Footer2/>]} />
        <Route path='/citizen_profile' element={[<UserNavbar/>,<CitizenProfile/>,<Footer/>,<Footer2/>]} />
        <Route path='/citizen/reportcrime' element={[<UserNavbar/>,<ReportCrime/>,<Footer/>,<Footer2/>]}/>
        <Route path='/updatecrime/:id' element={[<UserNavbar/>,<UpdateCrimeReport/>,<Footer/>,<Footer2/>]}/>
        <Route path='/addcomplaints' element={[<UserNavbar />,<CitizenAddComplaint />,<Footer/>,<Footer2/>]} />
        <Route path='/viewcrimestatus' element={[<UserNavbar />,<ViewCrimeReport />,<Footer/>,<Footer2/>]} />
        <Route path='/viewcrimedetails/:id' element={[<UserNavbar />,<ViewCrimeDetails />,<Footer/>,<Footer2/>]} />
        <Route path='/crimestatus' element={[<UserNavbar />,<CrimeReportwithStatus />,<Footer/>,<Footer2/>]} />
        <Route path='/viewcrimereportstatus/:id' element={[<UserNavbar />,<ViewCrimeStatus />,<Footer/>,<Footer2/>]} />
        <Route path='/viewnotification' element={[<UserNavbar/>,<CitizenViewNotification/>,<Footer/>,<Footer2/>]} />
        <Route path='/user_view_police' element={[<UserNavbar/>,<CitizenViewPolice/>,<Footer/>,<Footer2/>]} />


        {/* Police  */}

        <Route path='/police_register' element={[<LandingNavbar/>,<PoliceRegister/>,<Footer/>,<Footer2/>]} />
        <Route path='/police_login' element={[<LandingNavbar/>,<PoliceLogin/>,<Footer/>,<Footer2/>]} />
        <Route path='/police_forgotpassword' element={[<LandingNavbar/>,<ForgotPassword activeUser='Police' />,<Footer/>,<Footer2/>]} />
        <Route path='/police_home' element={[<PoliceNavbar/>,<LoginBanner user='police' />,<PoliceLandingPageContent/>,<PoliceRecentCrimes/>,<Footer/>,<Footer2/>]} />
        <Route path='/policeviewcases' element={[<PoliceNavbar/>,<PoliceViewCases type='request' />,<Footer/>,<Footer2/>]} />
        <Route path='/policeviewApprovedcases' element={[<PoliceNavbar/>,<PoliceViewCases type='view' />,<Footer/>,<Footer2/>]} />
        <Route path='/casedetails/:id' element={[<PoliceNavbar/>,<CaseDetails type='request' />,<Footer/>,<Footer2/>]}/>
        <Route path='/approvedcasedetails/:id' element={[<PoliceNavbar/>,<CaseDetails type='view' />,<Footer/>,<Footer2/>]}/>
        <Route path='/policeprofile/:id' element={[<PoliceNavbar/>,<PoliceProfile/>,<Footer/>,<Footer2/>]} />
        <Route path='/addcaseupdate/:id' element={[<PoliceNavbar/>,<AddCaseUpdate />,<Footer/>,<Footer2/>]}/>
        <Route path='/police_view_updates/:id' element={[<PoliceNavbar/>,<PoliceViewCaseUpdates />,<Footer/>,<Footer2/>]}/>
        <Route path='/police_view_alerts' element={[<PoliceNavbar/>,<PoliceViewAlerts />,<Footer/>,<Footer2/>]}/>


        {/* Scrb  */}

        <Route path='/scrb_login' element={[<LandingNavbar/>,<ScrbLogin/>,<Footer2/>]} />
        <Route path='/scrb-forgetpswd' element={[<LandingNavbar/>,<ScrbForgetpswd/>,<Footer2/>]}/>
        <Route path='/scrb-sidebar' element={[<LandingNavbar/>,<ScrbSidebar/>,<Footer2/>]} />
        <Route path='/scrb-dashboard' element={[<ScrbMain data="scrbdashboard"/>,<Footer2/>]}/>
        <Route path='/scrb-viewNotification' element={[<ScrbMain data="scrbviewnotification"/>,<Footer2/>]} />
        <Route path='/scrb-viewNotificationdetails/:id' element={[<ScrbMain data="scrbviewnotificationdetails"/>,<Footer2/>]} />
        <Route path='/scrb-vieweachNotification' element={[<ScrbMain data="scrbvieweachnotification"/>,<Footer2/>]} />
        <Route path='/scrb-viewcasereport' element={[<ScrbMain data="scrbviewcasereport"/>,<Footer2/>]} />
        <Route path='/scrb-viewcasereportdetail/:id' element={[<ScrbMain data="scrbviewcasereportdetail"/>,<Footer2/>]} />

        {/* Scrb View Cases */}
        <Route path='/scrb_viewallcases' element={[<ScrbMain data='scrbviewallcasedetails'/>,<Footer2/>]} />
        <Route path='/scrb_viewcasedetails/:id' element={[<ScrbMain data='scrbvieweachcasedetails'/>,<Footer2/>]} />

        {/* Scrb View Police Station */}
        <Route path='/scrb-viewallpolicestation' element={[<ScrbMain data="scrb-viewallpolicestation"/>,<Footer2/>]} />
        <Route path='/scrb-viewallpolice/:id' element={[<ScrbMain data="scrb-viewallpoliceprofile"/>,<Footer2/>]}/>
        
        {/* Scrb Generate Crime Alert */}
        <Route path='/scrb-generatealert' element={[<ScrbMain data="scrb-generatealert"/>,<Footer2/>]}/>
        <Route path='/scrb-view_case_updates/:id' element={[<ScrbMain data="scrb-view-case-updates"/>,<Footer2/>]}/>

        {/* Admin  */}

        <Route path='/admin' element={[<LoginNav/>,<AdminLogin/>,<Footer2/>]} />
        <Route path='/admin_home' element={[<AdminNavbar/>,<AdminHome/>,<Footer2/>]} />
        <Route path='/admin-dashboard' element={[<AdminNavbar/>,<AdminMain data="admindashboard"/>,<Footer2/>]} />
        <Route path='/admin-addprivacypolicy' element={[<AdminNavbar/>,<AdminMain data="addprivacypolicy"/>,<Footer2/>]} />
        <Route path='/admin-editprivacypolicy' element={[<AdminNavbar/>,<AdminMain data="editprivacypolicy"/>,<Footer2/>]} />
        <Route path='/admin-viewprivacypolicy' element={[<AdminNavbar/>,<AdminMain data="viewprivacypolicy"/>,<Footer2/>]} />
        <Route path='/admin-viewNotification' element={[<AdminNavbar/>,<AdminMain data="adminviewnotification"/>,<Footer2/>]} />
        <Route path='/admin-viewNotificationDetails/:id' element={[<AdminNavbar/>,<AdminMain data="adminviewnotificationdetail"/>,<Footer2/>]} />
        <Route path='/admin-vieweachNotification' element={[<AdminNavbar/>,<AdminMain data="adminvieweachnotification"/>,<Footer2/>]} />
        <Route path='/admin-viewcomplaints' element={[<AdminNavbar/>,<AdminMain data="adminviewcomplaints"/>,<Footer2/>]} />
        <Route path='/admin-viewcasereport' element={[<AdminNavbar/>,<AdminMain data="anminviewcasereport"/>,<Footer2/>]} />
        <Route path='/admin-viewcasereportdetails/:id' element={[<AdminNavbar/>,<AdminMain data="adminviewcasereportdetails"/>,<Footer2/>]} />


        {/* Admin View Cases */}
        <Route path='/admin_viewallcases' element={[<AdminNavbar/>,<AdminMain data='adminviewallcasedetails'/>,<Footer2/>]} />
        <Route path='/admin_viewcasedetails/:id' element={[<AdminNavbar/>,<AdminMain data='adminvieweachcasedetails'/>,<Footer2/>]} />

        {/* Admin View Police */}

        <Route path='/admin_viewallpolicestation' element={[<AdminNavbar/>,<AdminMain data="viewallpolicestation"/>,<Footer2/>]} />
        <Route path='/admin_viewallpolice/:id' element={[<AdminNavbar/>,<AdminMain data="viewallpoliceprofile"/>,<Footer2/>]}/>
        <Route path='/viewallpolicereq/:id' element={[<AdminNavbar/>,<AdminMain data="viewallpolicereqprofile"/>,<Footer2/>]}/>
        <Route path='/newpolicestationreq' element={[<AdminNavbar />,<AdminMain data="newpolicestationreq"/>,<Footer2/>]} />
        <Route path='/admin-view_case_updates/:id' element={[<AdminNavbar />,<AdminMain data="admin-view-case-updates"/>,<Footer2/>]} />

        {/* Admin View Citizen */}
        <Route path='/viewcitizens' element={[<AdminNavbar/>,<AdminMain data="viewallcitizen"/>,<Footer2/>]} />
        <Route path='/viewcitizenprofile/:id' element={[<AdminNavbar/>,<AdminMain data="viewcitizenprofile"/>,<Footer2/>]} />

        <Route path='/report-crime' element={[<LandingNavbar/>,<ReportCrimeForm/>,<Footer/>,<Footer2/>]} />
        
      </Routes>
    </div>
    {/* <Footer/>
    <Footer2/> */}
    </BrowserRouter>
    
  );
}

export default App;
