import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Trophy, ChevronRight, RotateCcw, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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

  post: (endpoint, data) =>
    axios.post(`${API_BASE_URL}${endpoint}/`, data, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
};

const OptionsSection = ({ selectedQuestion, showOptions }) => {
  const [tournamentState, setTournamentState] = useState({
    round: 1,
    matches: [],
    currentMatchIndex: 0,
    winners: [],
    tournamentComplete: false,
    finalWinner: null,
    matchHistory: [],
  });

  const optionsQuery = useQuery({
    queryKey: ['options', selectedQuestion],
    queryFn: () => api.get('options', { question: selectedQuestion }),
    enabled: !!selectedQuestion && showOptions,
  });

  const initializeTournament = useCallback((options) => {
    const shuffledOptions = shuffleArray([...options]);
    const matches = createInitialMatches(shuffledOptions);

    setTournamentState(prev => ({
      ...prev,
      matches,
      round: 1,
      currentMatchIndex: 0,
      winners: [],
      tournamentComplete: false,
      finalWinner: null,
      matchHistory: [],
    }));
  }, []);

  useEffect(() => {
    if (optionsQuery.data) {
      initializeTournament(optionsQuery.data);
    }
  }, [optionsQuery.data, initializeTournament]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const createInitialMatches = (options) => {
    const matches = [];
    for (let i = 0; i < options.length; i += 2) {
      matches.push({
        option1: options[i],
        option2: options[i + 1] || null,
        winner: null,
      });
    }
    return matches;
  };

  const handleOptionClick = async (selectedOption) => {
    const currentMatch = tournamentState.matches[tournamentState.currentMatchIndex];

    const matchResult = {
      round: tournamentState.round,
      winner: selectedOption,
      loser: selectedOption.id === currentMatch.option1?.id ? currentMatch.option2 : currentMatch.option1,
      timestamp: new Date().toISOString(),
    };

    setTournamentState(prev => ({
      ...prev,
      matchHistory: [...prev.matchHistory, matchResult],
      winners: [...prev.winners, selectedOption],
    }));

    if (tournamentState.currentMatchIndex < tournamentState.matches.length - 1) {
      setTimeout(() => {
        setTournamentState(prev => ({
          ...prev,
          currentMatchIndex: prev.currentMatchIndex + 1,
        }));
      }, 300);
    } else {
      const winners = [...tournamentState.winners, selectedOption];
      if (winners.length === 1) {
        setTournamentState(prev => ({
          ...prev,
          tournamentComplete: true,
          finalWinner: winners[0],
        }));

        try {
          await api.post('tournaments', {
            questionId: selectedQuestion,
            winner: winners[0].id,
            history: tournamentState.matchHistory,
          });
        } catch (error) {
          console.error('Failed to save tournament results:', error);
        }
      } else {
        setTimeout(() => {
          const newMatches = createInitialMatches(winners);
          setTournamentState(prev => ({
            ...prev,
            round: prev.round + 1,
            matches: newMatches,
            currentMatchIndex: 0,
            winners: [],
          }));
        }, 300);
      }
    }
  };

  const resetTournament = () => {
    if (optionsQuery.data) {
      initializeTournament(optionsQuery.data);
    }
  };

  if (optionsQuery.isLoading) {
    return <LoadingSpinner />;
  }

  const currentMatch = tournamentState.matches[tournamentState.currentMatchIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white"
        layout
      >
        <div className="flex items-center space-x-3">
          <Trophy className="w-6 h-6" />
          <div>
            <h2 className="text-2xl font-bold">Round {tournamentState.round}</h2>
            <p className="text-sm opacity-90">
              Match {tournamentState.currentMatchIndex + 1} de {tournamentState.matches.length}
            </p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetTournament}
          className="flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Recommencer
        </motion.button>
      </motion.div>

      <AnimatePresence mode="wait">
        {tournamentState.tournamentComplete ? (
          <motion.div
            key="winner"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            </motion.div>

            <h3 className="text-2xl font-bold mb-2">Gagnant !</h3>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto"
            >
              <motion.img
                src={tournamentState.finalWinner?.image}
                alt={tournamentState.finalWinner?.name}
                className="w-48 h-auto mx-auto rounded-xl mb-4"
                layoutId={`image-${tournamentState.finalWinner?.id}`}
              />
              <motion.h4
                className="text-xl font-semibold"
                layoutId={`name-${tournamentState.finalWinner?.id}`}
              >
                {tournamentState.finalWinner?.name}
              </motion.h4>
              <p className="text-gray-600 mt-2">{tournamentState.finalWinner?.description}</p>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTournament}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Nouveau Tournoi
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="matches"
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentMatch && [currentMatch.option1, currentMatch.option2].map((option, index) => (
              option && (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleOptionClick(option)}
                  className="bg-white rounded-xl shadow-xl p-6 transition-all cursor-pointer hover:shadow-2xl"
                >
                  <motion.h4
                    className="text-xl font-semibold text-gray-900"
                    layoutId={`name-${option.id}`}
                  >
                    {option.name}
                  </motion.h4>
                  {option.image && (
                    <motion.img
                      src={option.image}
                      alt={option.name}
                      className="w-48 h-auto mt-2 rounded-xl shadow-md mx-auto"
                      layoutId={`image-${option.id}`}
                    />
                  )}
                  <p className="text-gray-700 mt-2">{option.description}</p>
                  <p className="text-gray-400 mt-2 text-sm">Source: {option.anime_source}</p>
                </motion.div>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8"
      >
        <h3 className="text-xl font-semibold mb-4">Historique des Matchs</h3>
        <motion.div className="space-y-2">
          <AnimatePresence>
            {tournamentState.matchHistory.map((match, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span className="font-medium">Round {match.round}</span>
                <div className="flex items-center">
                  <span className="text-gray-600">{match.loser?.name || 'N/A'}</span>
                  <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                  <span className="font-semibold text-green-600">{match.winner?.name || 'N/A'}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default function OptionsSectionWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <OptionsSection {...props} />
    </ErrorBoundary>
  );
}