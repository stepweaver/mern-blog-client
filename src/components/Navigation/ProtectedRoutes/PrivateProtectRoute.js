/**
 * Functional component that protects routes in a React application.
 * It checks if the user is authenticated and redirects them to the login page if they are not.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The component(s) to be rendered if the user is authenticated.
 * @returns {ReactNode} - The rendered component(s) or a redirect to the login page.
 */
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

export const PrivateProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.users);

  const { userAuth } = user;

  if (!userAuth) {
    return navigate(`/login`);
  }
  return children ? children : <Outlet />;
};

export default PrivateProtectRoute;
