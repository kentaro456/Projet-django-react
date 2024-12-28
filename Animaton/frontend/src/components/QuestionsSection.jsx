import React, { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ChevronRight, AlertCircle, HelpCircle } from 'lucide-react';

// API Configuration
const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const createAPIClient = () => {
  const getToken = () => localStorage.getItem('token');

  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return client;
};

const api = createAPIClient();

// API Services
const questionService = {
  getQuestions: async (categoryId) => {
    try {
      const { data } = await api.get('questions/', {
        params: { category: categoryId }
      });
      return data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
        'Erreur lors du chargement des questions'
      );
    }
  }
};

// Constants
const GRID_LAYOUTS = {
  sm: 'grid-cols-1',
  md: 'grid-cols-2',
  lg: 'grid-cols-3'
};

const QuestionCard = ({ question, isSelected, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      group relative overflow-hidden cursor-pointer
      bg-white dark:bg-gray-800 rounded-lg
      shadow-sm hover:shadow-lg
      transform transition-all duration-200 hover:-translate-y-0.5
      ${isSelected ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}
    `}
  >
    <div className="p-6">
      <div className="flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
        <div className="space-y-2 flex-1">
          <h4 className="font-medium text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {question.text}
          </h4>
          {question.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {question.description}
            </p>
          )}
        </div>
        <ChevronRight 
          className={`
            w-5 h-5 transition-transform duration-200
            text-gray-400 dark:text-gray-500
            ${isSelected ? 'rotate-90 text-blue-500' : 'group-hover:translate-x-1'}
          `}
        />
      </div>
    </div>
  </div>
);

const LoadingState = () => (
  <div className={`grid gap-6 ${GRID_LAYOUTS.sm} ${GRID_LAYOUTS.md} ${GRID_LAYOUTS.lg}`}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg" />
      </div>
    ))}
  </div>
);

const ErrorState = ({ error }) => (
  <div className="rounded-lg bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800">
    <div className="flex items-start">
      <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
      <div className="ml-3">
        <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
          Erreur
        </h3>
        <p className="mt-1 text-sm text-red-700 dark:text-red-300">
          {error?.message || 'Impossible de charger les questions. Veuillez réessayer.'}
        </p>
      </div>
    </div>
  </div>
);

const InfoAlert = ({ title, children }) => (
  <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
    <div className="flex items-start">
      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
      <div className="ml-3">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
          {title}
        </h3>
        <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
          {children}
        </p>
      </div>
    </div>
  </div>
);

const QuestionsSection = ({ selectedCategory, selectedQuestion, setSelectedQuestion }) => {
  // Query hook
  const { 
    data: questions,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['questions', selectedCategory],
    queryFn: () => questionService.getQuestions(selectedCategory),
    enabled: !!selectedCategory,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: 2,
    onError: (error) => {
      console.error('Error fetching questions:', error);
    }
  });

  const handleQuestionSelect = useCallback((questionId) => {
    setSelectedQuestion(questionId === selectedQuestion ? null : questionId);
  }, [selectedQuestion, setSelectedQuestion]);

  const filteredQuestions = useMemo(() => {
    if (!questions || !selectedCategory) return [];
    return questions;
  }, [questions, selectedCategory]);

  if (!selectedCategory) {
    return (
      <InfoAlert title="Information">
        Veuillez sélectionner une catégorie pour voir les questions associées.
      </InfoAlert>
    );
  }

  if (isLoading) return <LoadingState />;
  if (isError) return (
    <div className="space-y-4">
      <ErrorState error={error} />
      <button
        onClick={() => refetch()}
        className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
      >
        Réessayer
      </button>
    </div>
  );
  
  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Questions
          {filteredQuestions.length > 0 && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({filteredQuestions.length})
            </span>
          )}
        </h2>
      </header>

      {filteredQuestions.length === 0 ? (
        <InfoAlert title="Information">
          Aucune question n'est disponible pour cette catégorie.
        </InfoAlert>
      ) : (
        <div className={`grid gap-6 ${GRID_LAYOUTS.sm} ${GRID_LAYOUTS.md} ${GRID_LAYOUTS.lg}`}>
          {filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestion === question.id}
              onClick={() => handleQuestionSelect(question.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default QuestionsSection;