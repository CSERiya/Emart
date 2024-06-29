import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const ProtectedStripeElements = ({ stripeApiKey, children }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Elements stripe={loadStripe(stripeApiKey)}>{children}</Elements>;
};

export default ProtectedStripeElements;