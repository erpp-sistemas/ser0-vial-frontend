import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Suponiendo que tu estado de usuario está en el Redux store

  // Si el usuario no está autenticado, redirige a la página de login ('/')
  if (!user || !user.user_id) {
    return <Navigate to="/" />;
  }

  // Si está autenticado, permite el acceso a la ruta protegida
  return children;
};

export default ProtectedRoute;
