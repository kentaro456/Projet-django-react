import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-2xl mb-8">Page non trouvée</p>
      <Link to="/" className="text-yellow-400 hover:text-yellow-500">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;