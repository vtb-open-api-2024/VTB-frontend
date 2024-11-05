import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../redux/authSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, mainSection, ...props }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <Component mainSection={mainSection} {...props} /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
