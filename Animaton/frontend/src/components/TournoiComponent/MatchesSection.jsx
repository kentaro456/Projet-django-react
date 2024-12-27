import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';
const DEFAULT_CREATOR_ID = 1;

const api = {
  get: (endpoint, params = {}) =>
    axios.get(`${API_BASE_URL}${endpoint}/`, {
      params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.data),
  post: (endpoint, data) =>
    axios.post(`${API_BASE_URL}${endpoint}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.data),
};

const MatchesSection = ({ roundId }) => {
  const queryClient = useQueryClient();
  const matchesQuery = useQuery({
    queryKey: ['matches', roundId],
    queryFn: () => api.get('matches', { round: roundId }),
    enabled: !!roundId,
  });

  const createVoteMutation = useMutation({
    mutationFn: (data) => api.post('votes', {
      match: data.match_id,
      user: DEFAULT_CREATOR_ID,
      option: data.option_id
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches', data.match_id] });
    },
  });

  return (
    <section>
      <h3 className="text-2xl font-bold mb-4 flex items-center">
        <span className="mr-2">🤝</span>
        Matches
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matchesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          matchesQuery.data?.map((match) => (
            <div
              key={match.id}
              className="bg-white rounded-xl shadow-xl p-6 transition-all transform duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
            >
              <h4 className="text-xl font-semibold text-gray-900">{match.option1.name} vs {match.option2.name}</h4>
              <p className="text-gray-700 mt-2">Votes pour {match.option1.name}: {match.option1_votes}</p>
              <p className="text-gray-700 mt-2">Votes pour {match.option2.name}: {match.option2_votes}</p>
              <p className="text-gray-700 mt-2">Gagnant: {match.winner ? match.winner.name : 'En cours'}</p>
              <button
                onClick={() => createVoteMutation.mutate({
                  match_id: match.id,
                  option_id: match.option1.id
                })}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
              >
                Voter pour {match.option1.name}
              </button>
              <button
                onClick={() => createVoteMutation.mutate({
                  match_id: match.id,
                  option_id: match.option2.id
                })}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-green-300"
              >
                Voter pour {match.option2.name}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default MatchesSection;
