import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = {
  get: (endpoint, params = {}) =>
    axios.get(`${API_BASE_URL}${endpoint}/`, {
      params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
};

const CategoriesSection = ({ selectedCategory, setSelectedCategory, setSelectedQuestion }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('categories'),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 max-w-lg mx-auto bg-red-100 border border-red-500 text-red-700 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-2">Une erreur est survenue</h3>
        <p>{error.message || 'Impossible de charger les catégories.'}</p>
      </div>
    );
  }

  return (
    <section className="mt-8">
      <h3 className="text-3xl font-bold mb-6 text-center text-gray-900 flex items-center justify-center">
        <span className="mr-3">📑</span>
        <span>Catégories</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data?.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setSelectedQuestion(null);
            }}
            className={`bg-white rounded-xl shadow-xl p-6 transition-all duration-300 transform hover:shadow-2xl hover:scale-105 cursor-pointer ${
              selectedCategory === category.id ? 'ring-4 ring-blue-500' : ''
            }`}
          >
            <h4 className="text-xl font-semibold text-gray-900">{category.name}</h4>
            <p className="text-gray-600 mt-2">{category.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
