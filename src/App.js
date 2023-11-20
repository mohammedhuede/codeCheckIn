import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './index.css';
import Login from './Components/Onboarding/Login/Login';
import { Routes, Route, Link, useNavigate } from "react-router-dom"
import Signup from './Components/Onboarding/Login/Signup';
import Forgetpass from './Components/Onboarding/Login/Forgetpass';
import ReturnLogin from './Components/Onboarding/Login/Returnlogin';
import Resetpass from './Components/Onboarding/Login/Resetpass';
import Signupconfirm from './Components/Onboarding/Login/signupconfirmation';
import Emailverification from './Components/Onboarding/Login/Email-Verification';
import Welcomehome from './Components/Onboarding/Login/Welcomehome';
import MobileLogin from './Components/Onboarding/Login/Mobile-Login';
import Mainside from './Components/Onboarding/Onboardsteps/Mainstep';
import Hospitallisting from './Components/Listings/Hospital-listing';
import Referrallisting from './Components/Listings/Referrallisting';
import ReferrallistingBK from './Components/Listings/ReferrallistingBK';
import Doctorlisting from './Components/Listings/Doctor-listing';
import Adminlisting from './Components/Listings/Admin-listing';
import Listingdashboard from './Components/Listings/Dashboard';
import Hospitalfullpage from './Components/Listings/Hospitalfullpage';
import Amplify, { Auth } from "aws-amplify";
import config from "./aws-exports";
import { useState, useEffect } from 'react';
import { AuthContextProvider } from './contexts/authContext';
import { Loader } from './Components/Loader';
import PageNotFound from './Components/PageNotFound';
import HospitalCreated from './Components/Onboarding/HospitalCreated';
import Loginconfirm from './Components/Onboarding/Login/login-confrimation';
import ChangeNumber from './Components/Onboarding/Login/Change-number';
import ChangeEmail from './Components/Onboarding/Login/Change-email';
import DischargePatient from './Components/Listings/Discharge-Patient';
import Passwordfield from './Components/Onboarding/Login/password';
import { connect } from 'react-redux';
import PreviewReferralDetail from './Components/Listings/Preview-referral-detail';


Amplify.configure(config);

function App(props) {
  const [loggedIn, setLoggedIn] = useState(true)
  const [contextData, setContextData] = useState(null)


  // useEffect(() => {
  //   AssessLoggedInState()
  // }, [])

  // const AssessLoggedInState = () => {
  //   Auth.currentAuthenticatedUser().then(async (res) => {
  //     localStorage.setItem('partnerId', res.attributes.sub)
  //     localStorage.setItem('fullName', res.attributes.name)
  //     // localStorage.setItem('accessToken', res.signInUserSession.accessToken.jwtToken)
  //     const credentials = await Auth.currentUserCredentials();
  //     localStorage.setItem('identityId', credentials.identityId)
  //     setContextData(res.attributes)
  //     setLoggedIn(true)
  //   }).catch(() => {
  //     console.log('failed')
  //     setLoggedIn(false)
  //   })
  // }

  const onSignIn = () => {
    setLoggedIn(true)
  }

  const onSignOut = () => {
    setLoggedIn(false)
  }

  return (
    <>
      <AuthContextProvider contextData={{contextData, onSignOut, loggedIn}}>
        <Routes>
          <Route path="*" element={<PageNotFound />} />
          <Route path="/" element={loggedIn ? <Welcomehome/> : (loggedIn === null ? <Loader /> : <Login onSignIn={onSignIn} />)} />
          <Route path="/signin" element={<Login onSignIn={onSignIn} />} />
          <Route path="/signupconfirm" element={<Signupconfirm />} />
          <Route path="/emailverify" element={<Emailverification onSignIn={onSignIn} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="forgetpass" element={<Forgetpass />} />
          <Route path="returnlogin" element={<ReturnLogin />} />
          <Route path="resetpass" element={<Resetpass />} />
          <Route path="changenumber" element={<ChangeNumber />} />
          <Route path="changeemail" element={<ChangeEmail />} />
          <Route path="passwordfield" element={<Passwordfield />} />


          {<>
            <Route path="mainside" element={<Mainside />} />
            <Route path="hospitalfullpage" element={<Hospitalfullpage />} />
            <Route path="refferal" element={<Referrallisting />} />
            <Route path="refferal-bk" element={<ReferrallistingBK />} />
            <Route path="dashboard" element={<Listingdashboard />} />
            <Route path="hospitallisting" element={<Hospitallisting />} />
            <Route path="doctorlisting" element={<Doctorlisting />} />
            <Route path="adminlisting" element={<Adminlisting />} />
            <Route path="mobilelogin" element={<MobileLogin />} />
            <Route path="welcomehome" element={<Welcomehome/>} />
            <Route path="hospitalcreated" element={<HospitalCreated />} />
            <Route path="loginconfirm" element={<Loginconfirm />} />
            <Route path="dischargepatient" element={<DischargePatient />} />
            <Route path="previewreferraldetail" element={<PreviewReferralDetail />} />
          </>
          }
        </Routes>
      </AuthContextProvider>
      {props.hospitalDetails.loader ? <Loader/> : null}
    </>
  );
}

const mapStateToProps = (state) => ({
  hospitalDetails: state.HospitalDetails
})

export default connect(mapStateToProps, null)(App);