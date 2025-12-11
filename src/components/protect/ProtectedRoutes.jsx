import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ children }) {
  const userData = useSelector((state) => state.user);
console.log('s',userData);

  if (!userData?.user) {
    
    return <Navigate to="/login" replace />;
  }

  return children;
}
