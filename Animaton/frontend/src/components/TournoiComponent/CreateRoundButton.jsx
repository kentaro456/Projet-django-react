import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = {
  post: (endpoint, data) =>
    axios.post(`${API_BASE_URL}${endpoint}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.data),
};

const CreateRoundButton = ({ tournamentId, roundsQuery }) => {
  const queryClient = useQueryClient();
  const createRoundMutation = useMutation({
    mutationFn: (data) => api.post('rounds', {
      round_number: data.round_number,
      start_time: new Date().toISOString(),
      is_active: true,
      tournament: tournamentId
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rounds', tournamentId] });
    },
    onError: (error) => {
      console.error('Error creating round:', error);
    }
  });

  const roundsData = roundsQuery?.data || []; // Valeur par défaut : tableau vide si undefined
  const isLoading = roundsQuery?.isLoading || false;

  const handleClick = () => {
    if (isLoading) {
      console.log('Chargement des rounds...');
      return; // Ne rien faire tant que les données ne sont pas encore disponibles
    }

    if (tournamentId && Array.isArray(roundsData)) {
      const round_number = roundsData.length + 1;
      createRoundMutation.mutate({ round_number });
    } else {
      console.error('Tournament ID ou données des rounds manquantes');
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={createRoundMutation.isLoading || isLoading}
      className="w-full px-6 py-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-300 ease-in-out"
    >
      {createRoundMutation.isLoading ? 'Création du round...' : 'Commencer un nouveau round'}
    </button>
  );
};

export default CreateRoundButton;
