import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem('token');
  const parsedItem = token ? JSON.parse(token).data.user : null;

  if (!parsedItem || parsedItem.role !== 'admin') {
    return <Navigate to='/unauthorised' replace />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};
