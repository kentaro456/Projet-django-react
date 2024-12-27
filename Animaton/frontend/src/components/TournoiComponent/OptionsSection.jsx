import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Trophy, ChevronRight, RotateCcw, Crown } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';

// API base URL
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

// API Helper Functions
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

// Error Boundary Component
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

// Options Section Component
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

  useEffect(() => {
    if (optionsQuery.data) {
      initializeTournament(optionsQuery.data);
    }
  }, [optionsQuery.data]);

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
      setTournamentState(prev => ({
        ...prev,
        currentMatchIndex: prev.currentMatchIndex + 1,
      }));
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
        const newMatches = createInitialMatches(winners);
        setTournamentState(prev => ({
          ...prev,
          round: prev.round + 1,
          matches: newMatches,
          currentMatchIndex: 0,
          winners: [],
        }));
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
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Round {tournamentState.round}</h2>
          <p className="text-gray-600">
            Match {tournamentState.currentMatchIndex + 1} of {tournamentState.matches.length}
          </p>
        </div>
        <button
          onClick={resetTournament}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Restart
        </button>
      </div>

      {tournamentState.tournamentComplete ? (
        <div className="text-center py-8">
          <Crown className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Winner!</h3>
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto">
            <img
              src={tournamentState.finalWinner?.image}
              alt={tournamentState.finalWinner?.name}
              className="w-48 h-auto mx-auto rounded-xl mb-4"
            />
            <h4 className="text-xl font-semibold">{tournamentState.finalWinner?.name}</h4>
            <p className="text-gray-600 mt-2">{tournamentState.finalWinner?.description}</p>
          </div>
          <button
            onClick={resetTournament}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start New Tournament
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentMatch && [currentMatch.option1, currentMatch.option2].map((option, index) => (
            option ? (
              <div
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="bg-white rounded-xl shadow-xl p-6 transition-all transform duration-300 cursor-pointer hover:shadow-2xl hover:scale-105"
              >
                <h4 className="text-xl font-semibold text-gray-900">{option.name}</h4>
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.name}
                    className="w-48 h-auto mt-2 rounded-xl shadow-md mx-auto"
                  />
                )}
                <p className="text-gray-700 mt-2">{option.description}</p>
                <p className="text-gray-400 mt-2 text-sm">Source: {option.anime_source}</p>
              </div>
            ) : null
          ))}
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Match History</h3>
        <div className="space-y-2">
          {tournamentState.matchHistory.map((match, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
              <span className="font-medium">Round {match.round}</span>
              <div className="flex items-center">
                <span className="text-gray-600">{match.loser?.name || 'N/A'}</span>
                <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
                <span className="font-semibold text-green-600">{match.winner?.name || 'N/A'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrap the OptionsSection with ErrorBoundary
export default function OptionsSectionWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <OptionsSection {...props} />
    </ErrorBoundary>
  );
}