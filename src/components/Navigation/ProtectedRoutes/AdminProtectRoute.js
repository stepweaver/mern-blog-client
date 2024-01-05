/**
 * Functional component that protects routes in a React application by checking if the user is authenticated and has admin privileges.
 * If the user is not authenticated or does not have admin privileges, it redirects them to the login page.
 * If the user is authenticated and has admin privileges, it renders the children components or the Outlet component.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The components that should be rendered if the user is authenticated and has admin privileges.
 * @returns {React.ReactNode} - The rendered children components or the Outlet component.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';

export const AdminProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.users);

  const { userAuth } = user;

  if (!userAuth || !userAuth.isAdmin) {
    return navigate(`/login`);
  }
  return children ? children : <Outlet />;
};

export default AdminProtectRoute;
