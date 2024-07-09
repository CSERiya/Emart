import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAdmin, element: Element }) => {
  const { isAuthenticated, user } = useSelector(state => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/account" />;
  }

  return <Element />;
};

export default ProtectedRoute;

