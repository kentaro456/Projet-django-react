import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';
const DEFAULT_CREATOR_ID = 1;

const api = {
  post: (endpoint, data) =>
    axios.post(`${API_BASE_URL}${endpoint}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
};

const StartTournamentButton = ({ selectedCategory, selectedQuestion, setState }) => {
  const [error, setError] = useState(null);  // Pour gérer l'erreur
  const queryClient = useQueryClient();

  const createTournamentMutation = useMutation({
    mutationFn: (data) => api.post('tournaments', {
      name: 'Tournoi Anime',
      category: data.category_id,
      question: data.question_id,
      is_active: true,
      creator: DEFAULT_CREATOR_ID,
    }),
    onSuccess: (response) => {
      setState(prev => ({
        ...prev,
        tournamentId: response.id,
        showOptions: true,
      }));
      queryClient.invalidateQueries({ queryKey: ['rounds'] });
    },
    onError: (error) => {
      // Gérer l'erreur si la requête échoue
      setError('Une erreur est survenue lors de la création du tournoi.');
    },
  });

  const handleClick = () => {
    if (!selectedCategory || !selectedQuestion) {
      setError('Veuillez sélectionner une catégorie et une question.');
      return;
    }

    createTournamentMutation.mutate({
      category_id: selectedCategory,
      question_id: selectedQuestion,
    });
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>} {/* Afficher l'erreur si présente */}
      <button
        onClick={handleClick}
        disabled={createTournamentMutation.isLoading}
        className="w-full px-6 py-3 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300 transition-all duration-300 ease-in-out"
      >
        {createTournamentMutation.isLoading ? 'Création du tournoi...' : 'Commencer le tournoi'}
      </button>
    </div>
  );
};

export default StartTournamentButton;
