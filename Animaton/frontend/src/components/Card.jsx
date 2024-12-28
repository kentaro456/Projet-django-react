import React from 'react';

export const Card = ({ children }) => (
  <div className="rounded-lg shadow-md bg-gray-800">{children}</div>
);

export const CardContent = ({ children }) => (
  <div className="p-4">{children}</div>
);
