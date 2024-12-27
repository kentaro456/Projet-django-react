import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import CategoriesSection from './TournoiComponent/CategoriesSection.jsx';
import QuestionsSection from './QuestionsSection';
import OptionsSection from './TournoiComponent/OptionsSection';
import StartTournamentButton from './TournoiComponent/StartTournamentButton';
import LoadingSpinner from './LoadingSpinner';

const Tournament = () => {
  const [state, setState] = useState({
    selectedCategory: null,
    selectedQuestion: null,
    tournamentName: 'Tournoi Anime',
    showOptions: false,
    tournamentId: null,
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleErrorReset = () => {
    setError(null);
  };

  // Error display
  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto bg-red-100 border border-red-500 text-red-700 rounded-lg shadow-lg">
        <h3 className="font-bold text-lg mb-2">Une erreur est survenue</h3>
        <p>{error}</p>
        <button
          onClick={handleErrorReset}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-colors duration-300"
        >
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 bg-gradient-to-r from-blue-900 to-indigo-800 min-h-screen text-white space-y-12">
      <header className="text-center mb-12 space-y-4">
        <div className="flex items-center justify-center mb-4 space-x-4">
          <Trophy className="w-16 h-16 text-yellow-400" />
          <h1 className="text-6xl font-extrabold text-gray-100">Tournoi Anime</h1>
        </div>
        <p className="text-gray-300 text-xl max-w-lg mx-auto">
          Votez pour vos personnages et animes préférés dans un tournoi palpitant ! Rejoignez l'aventure dès maintenant.
        </p>
      </header>

      <div className="bg-white rounded-3xl shadow-2xl p-8 text-gray-900">
        <div className="space-y-12">
          <CategoriesSection
            selectedCategory={state.selectedCategory}
            setSelectedCategory={(categoryId) =>
              setState((prev) => ({ ...prev, selectedCategory: categoryId }))
            }
            setSelectedQuestion={(questionId) =>
              setState((prev) => ({ ...prev, selectedQuestion: questionId }))
            }
          />
          <QuestionsSection
            selectedCategory={state.selectedCategory}
            selectedQuestion={state.selectedQuestion}
            setSelectedQuestion={(questionId) =>
              setState((prev) => ({ ...prev, selectedQuestion: questionId }))
            }
          />
          <StartTournamentButton
            selectedCategory={state.selectedCategory}
            selectedQuestion={state.selectedQuestion}
            setState={setState}
          />
          {state.selectedQuestion && (
            <OptionsSection
              selectedQuestion={state.selectedQuestion}
              showOptions={state.showOptions}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Tournament;
