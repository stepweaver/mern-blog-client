/**
 * Functional component that renders different navigation bars based on the user's authentication status and role.
 * It also displays alerts and loading indicators based on the account verification status.
 *
 * @returns {JSX.Element} The rendered navigation bar component based on the user's authentication status and role.
 *                        The displayed alert components based on the user's authentication and verification status.
 *                        The loading indicator component if the account verification is in progress.
 *                        The success alert component if the account verification is successful.
 *                        The error message if there are application or server errors.
 */
import React from 'react';
import { useSelector } from 'react-redux';

import PublicNavbar from './Public/PublicNavbar';
import PrivateNavbar from './Private/PrivateNavbar';
import AdminNavbar from './Admin/AdminNavbar';
import AccountVerificationAlertWarning from './Alerts/AccountVerificationAlertWarning';
import AccountVerificationSuccessAlert from './Alerts/AccountVerificationSuccessAlert';

const Navbar = () => {
  // Get user from store
  const state = useSelector((state) => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;

  // Account Verification
  const account = useSelector((state) => state?.accountVerification);
  const { loading, appErr, serverErr, token } = account;

  return (
    <>
      {isAdmin ? (
        <AdminNavbar isLogin={userAuth} />
      ) : userAuth ? (
        <PrivateNavbar isLogin={userAuth} />
      ) : (
        <PublicNavbar />
      )}
      {/* Display Alert */}
      {userAuth && !userAuth.isVerified && <AccountVerificationAlertWarning />}
      {/* Display Success */}
      {loading && <h2 className='text-center'>Loading...</h2>}
      {token && <AccountVerificationSuccessAlert />}
      {appErr || serverErr ? (
        <h2 className='text-center text-red-500'>
          {serverErr} {appErr}
        </h2>
      ) : null}
    </>
  );
};

export default Navbar;
