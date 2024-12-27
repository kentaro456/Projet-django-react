import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Définir la fonction createMatch ici
const createMatch = async ({ round_id, option1_id, option2_id }) => {
  try {
    // Envoi de la requête POST pour créer un match
    const response = await axios.post('/api/matches', {
      round: round_id,            // Round ID
      option1: option1_id,        // Option 1 ID
      option2: option2_id,        // Option 2 ID
      option1_votes: 0,           // Initialiser les votes à 0
      option2_votes: 0,           // Initialiser les votes à 0
      winner: null                // Pas de gagnant au départ
    });

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du match', error);
    throw new Error('Échec de la création du match');
  }
};

// Hooks pour récupérer les données des tournois, options et matchs
const useRoundsQuery = (tournamentId) => useQuery({
  queryKey: ['rounds', tournamentId],
  queryFn: () => fetchRounds(tournamentId),
});

const useOptionsQuery = (questionId) => useQuery({
  queryKey: ['options', questionId],
  queryFn: () => fetchOptions(questionId),
});

const useMatchesQuery = (roundId) => useQuery({
  queryKey: ['matches', roundId],
  queryFn: () => fetchMatches(roundId),
});

const useCreateMatchMutation = () => useMutation({
  mutationFn: createMatch,
});

function MatchCreator({ tournamentId, questionId }) {
  const queryClient = useQueryClient();
  const roundsQuery = useRoundsQuery(tournamentId);
  const optionsQuery = useOptionsQuery(questionId);
  const matchesQuery = useMatchesQuery(roundsQuery.data?.[0]?.id);
  const createMatchMutation = useCreateMatchMutation();

  useEffect(() => {
    // Assurer que les données nécessaires sont présentes
    if (
      roundsQuery.data && roundsQuery.data.length > 0 &&
      optionsQuery.data && optionsQuery.data.length > 1 &&
      matchesQuery.data
    ) {
      const roundId = roundsQuery.data[0].id;
      const shuffledOptions = [...optionsQuery.data].sort(() => Math.random() - 0.5);
      const existingMatches = matchesQuery.data;

      // Créer un Set des paires existantes de matchs
      const existingMatchPairs = new Set(
        existingMatches.map(match =>
          [match.option1.id, match.option2.id].sort((a, b) => a - b).join('-')
        )
      );

      // Créer des matchs en paires
      for (let i = 0; i < shuffledOptions.length - 1; i += 2) {
        const option1 = shuffledOptions[i];
        const option2 = shuffledOptions[i + 1];

        if (option1 && option2) {
          const matchPairKey = [option1.id, option2.id].sort((a, b) => a - b).join('-');

          // Créer un match si la paire n'existe pas déjà
          if (!existingMatchPairs.has(matchPairKey)) {
            createMatchMutation.mutate({
              round_id: roundId,
              option1_id: option1.id,
              option2_id: option2.id
            });
          }
        }
      }
    }
  }, [roundsQuery.data, optionsQuery.data, matchesQuery.data, createMatchMutation]);

  // Gestion des états de chargement et d'erreur
  if (roundsQuery.isLoading || optionsQuery.isLoading || matchesQuery.isLoading) {
    return <div>Chargement...</div>;
  }

  if (roundsQuery.isError || optionsQuery.isError || matchesQuery.isError) {
    return <div>Erreur lors du chargement des données</div>;
  }

  return <div>Création de matchs en cours...</div>;
}

export default MatchCreator;
