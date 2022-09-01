import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import NavbarComponent from '../navbarComponent';
import FindCandidates from '../findCandidates';
import FindJobs from '../findJobs';
import FindJobsSearches from '../findJobsSearches';
import FindCandidateSearches from '../findCandidateSearches';
import PostJob from '../postJob';
import Guidelines from '../assessment/guidelines';
import EmployerProfile from '../employerProfile';
import JobStatus from '../jobStatus';
import CandidateProfileForm from '../candidateProfileForm';
import PostedJobs from '../postedJobs';
import MyCandidates from '../myCandidates';
import MyJobs from '../myJobs';
import MyProfileActivity from '../myProfileActivity';
import Assessment from '../assessment';
import StartAssessment from '../assessment/StartAssessment';
// import Footer from '../footer';
import Error from '../error/Error';
import URL, { ROLES_TYPES } from '../../constants/urls';
import Login from '../loginRegisterFlow/login';
import VerifyEmail from '../loginRegisterFlow/verifyEmail';
import ResendEmail from '../loginRegisterFlow/resendemail';
import Register from '../loginRegisterFlow/register';
import Payment from '../payment';
import PrivateRoute from '../../components/privateRoute';
import ProtectedRoute from '../../components/protectedRoute';
import PublicRoute from '../../components/publicRoute';

import ForgotPassword from '../loginRegisterFlow/forgotPassword';
import UpdatePassword from '../loginRegisterFlow/updatepassword';
import ConfirmEmail from '../loginRegisterFlow/confirmEmail';
import ChangePassword from '../loginRegisterFlow/changepassword';
import Confirm from '../loginRegisterFlow/confirm';
import {
  getLoginDetailFromSession,
  setLoginDetailInSession,
} from '../../helpers/sessionDetails';
import { getRequest } from '../../services';
import { API_URL } from '../../constants/apiUrls';
import { EMPTY_ARRAY } from '../../constants';
import STORAGE_KEY from '../../constants/storageKey';
import Loader from '../../components/loader';
import { getDefaultHomeUrl } from '../../helpers/getRedirectUrl';
import Employer from '../jobs/employer';

function RoutesComponent(props) {
  const { setShowFooter } = props;

  const [loggedInUserRole, setLoggedInUserRole] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [hideForAssess, setHideForAssess] = useState(false);
  const [availablePoint, setAvailablePoint] = useState();

  useEffect(() => {
    window.dispatchEvent(new Event('storage'));
  }, [loggedInUserRole]);

  useEffect(() => {
    // Added this listener because if we have multiple tabs in browser it should reflect in every tabs.
    window.addEventListener('storage', () => {
      setLoggedInUserRole(getLoginDetailFromSession()?.role);
    });
  }, EMPTY_ARRAY);

  useEffect(() => {
    const userDetail = getLoginDetailFromSession();
    if (userDetail) {
      setIsLoading(true);
      getRequest(API_URL.CREDENTIAL)
        .then((userCredential) => {
          getRequest(API_URL.POINTS).then((res) => {
            setAvailablePoint(res);
          });
          setLoggedInUserRole(userCredential.role);
          setLoginDetailInSession(userCredential);
        })
        .catch(() => {
          localStorage.removeItem(STORAGE_KEY.CANDIDATE_DETAILS);
          localStorage.removeItem(STORAGE_KEY.EMPLOYER_DETAILS);
          localStorage.removeItem(STORAGE_KEY.SESSION_DETAILS);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, EMPTY_ARRAY);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <BrowserRouter className="mt-3">
      {!hideForAssess && (
        <NavbarComponent
          setLoggedInUserRole={setLoggedInUserRole}
          loggedInUserRole={loggedInUserRole}
          availablePoint={availablePoint}
        />
      )}

      <Routes>
        {/* Employer URLs */}
        <Route
          path={URL.EMPLOYER_PROFILE}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <EmployerProfile />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.POST_JOB}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <PostJob />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.POSTED_JOBS}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <PostedJobs />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.MY_CANDIDATES}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <MyCandidates />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.JOB_STATUS}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <JobStatus />
            </PrivateRoute>
          }
        />

        {/* Candiate URLs */}

        <Route
          path={URL.EMPLOYER_DETAILS}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <Employer />
            </PrivateRoute>
          }
        />

        <Route
          path={URL.CANDIDATE_PROFILE}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <CandidateProfileForm />
            </PrivateRoute>
          }
        />

        <Route
          path={URL.MY_JOBS}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <MyJobs />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.My_Profile_Activity}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <MyProfileActivity />
            </PrivateRoute>
          }
        />

        <Route
          path={URL.ASSESSMENT}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <Assessment />
            </PrivateRoute>
          }
        />
        <Route
          path={URL.GUIDELINES}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <Guidelines
                setHideForAssess={setHideForAssess}
                setShowFooter={setShowFooter}
              />
            </PrivateRoute>
          }
        />

        <Route
          path={URL.START_ASSESSMENT}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <StartAssessment />
            </PrivateRoute>
          }
        />

        {/* Common URLs */}
        <Route
          path={URL.UPDATE_PASSWORD}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.COMMON}
            >
              <UpdatePassword />
            </PrivateRoute>
          }
        />

        <Route
          path={URL.PAYMENT}
          element={
            <PrivateRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.COMMON}
            >
              <Payment onHandlePoints={setAvailablePoint} />
            </PrivateRoute>
          }
        />

        {/* Public URLs */}
        <Route
          path={URL.HOME}
          element={
            <Navigate replace to={getDefaultHomeUrl(loggedInUserRole)} />
          }
        />
        <Route
          path={URL.FIND_JOBS}
          element={
            <ProtectedRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <FindJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path={URL.SEO_FIND_JOBS}
          element={
            <ProtectedRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <FindJobsSearches setLoggedInUserRole={setLoggedInUserRole} />
            </ProtectedRoute>
          }
        />
        <Route
          path={URL.FIND_JOBS_SEARCHES}
          element={
            <ProtectedRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.CANDIDATE}
            >
              <FindJobsSearches setLoggedInUserRole={setLoggedInUserRole} />
            </ProtectedRoute>
          }
        />
        <Route path={URL.FIND_CANDIDATES} element={<FindCandidates />} />
        <Route
          path={URL.SEO_FIND_CANDIDATES}
          element={
            <ProtectedRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <FindCandidateSearches
                setLoggedInUserRole={setLoggedInUserRole}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={URL.FIND_CANDIDATES_SEARCHES}
          element={
            <ProtectedRoute
              role={loggedInUserRole}
              roleTypes={ROLES_TYPES.EMPLOYER}
            >
              <FindCandidateSearches
                setLoggedInUserRole={setLoggedInUserRole}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path={URL.LOGIN}
          element={
            <Login
              setLoggedInUserRole={setLoggedInUserRole}
              onHandlePoints={setAvailablePoint}
            />
          }
        />
        <Route
          path={URL.REGISTER}
          element={
            <PublicRoute role={loggedInUserRole}>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path={URL.VERIFY_EMAIL}
          element={
            <PublicRoute role={loggedInUserRole}>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        <Route
          path={URL.CONFIRM_EMAIL}
          element={
            <PublicRoute role={loggedInUserRole}>
              <ConfirmEmail />
            </PublicRoute>
          }
        />
        <Route
          path={URL.FORGOT_PASSWORD}
          element={
            <PublicRoute role={loggedInUserRole}>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path={URL.RESEND_EMAIL}
          element={
            <PublicRoute role={loggedInUserRole}>
              <ResendEmail />
            </PublicRoute>
          }
        />
        <Route
          path={URL.CONFIRM}
          element={
            <PublicRoute role={loggedInUserRole}>
              <Confirm />
            </PublicRoute>
          }
        />
        <Route
          path={URL.CHANGE_PASSWORD}
          element={
            <PublicRoute role={loggedInUserRole}>
              <ChangePassword />
            </PublicRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

RoutesComponent.propTypes = {
  setShowFooter: PropTypes.func,
};

RoutesComponent.defaultProps = {
  setShowFooter: noop,
};

export default RoutesComponent;
