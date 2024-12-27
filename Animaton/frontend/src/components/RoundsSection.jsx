import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = {
  get: (endpoint, params = {}) =>
    axios.get(`${API_BASE_URL}${endpoint}/`, {
      params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.data),
};

const RoundsSection = ({ tournamentId }) => {
  const roundsQuery = useQuery({
    queryKey: ['rounds', tournamentId],
    queryFn: () => api.get('rounds', { tournament: tournamentId }),
    enabled: !!tournamentId,
  });

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <span className="mr-2">🏆</span>
        Rounds
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roundsQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          roundsQuery.data?.map((round) => (
            <div
              key={round.id}
              className="bg-white rounded-xl shadow-xl p-6 transition-all transform duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
            >
              <h4 className="text-xl font-semibold text-gray-900">Round {round.round_number}</h4>
              <p className="text-gray-700 mt-2">Start Time: {new Date(round.start_time).toLocaleString()}</p>
              <p className="text-gray-700 mt-2">End Time: {round.end_time ? new Date(round.end_time).toLocaleString() : 'En cours'}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RoundsSection;
