import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-4">
    <div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    <span className="ml-2">Chargement...</span>
  </div>
);

export default LoadingSpinner;
