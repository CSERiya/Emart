import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element: Element }) => {
  const { isAuthenticated } = useSelector(state => state.user);

  return isAuthenticated ? <Element /> : <Navigate to="/login" />;
};

export default ProtectedRoute;





