import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q');
  const page = parseInt(queryParams.get('page') || '1', 10);

  const [animeResults, setAnimeResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);

      const timeoutId = setTimeout(() => {
        setLoading(false);
        setError("Le temps de réponse a été trop long. Veuillez réessayer.");
      }, 10000);

      try {
        const response = await axios.get('http://localhost:8000/api/recherche/', {
          params: { q: searchQuery, sfw: true, limit: 50, page },
        });

        const results = response.data.anime_results.map((anime) => ({
          id: anime.id,
          title: anime.title,
          image_url: anime.image_url,
          synopsis: anime.synopsis?.substring(0, 100) + '...',
        }));

        setAnimeResults(results);
        setTotalResults(response.data.total_count || results.length);
      } catch (err) {
        setError("Une erreur est survenue lors de la récupération des résultats.");
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page]);

  const handleBack = () => {
    navigate('/');
  };

  const handleNextPage = () => {
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}&page=${page + 1}`);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      navigate(`/search-results?q=${encodeURIComponent(searchQuery)}&page=${page - 1}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <button
          onClick={handleBack}
          className="flex items-center mb-6 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          Retour à la recherche
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">
          Résultats pour "{searchQuery}"
        </h1>

        {loading && !error && (
          <div className="flex justify-center p-4">
            <div className="animate-spin w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
          </div>
        )}

        {error && (
          <div className="p-4 text-red-500 text-center">{error}</div>
        )}

        {!loading && animeResults.length === 0 && !error && (
          <div className="p-4 text-gray-400 text-center">Aucun résultat trouvé.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {animeResults.map((anime) => (
            <div
              key={anime.id}
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all hover:bg-gray-700 cursor-pointer transform hover:scale-105"
              onClick={() => navigate(`/anime/${anime.id}`)}
              aria-label={`Voir les détails de ${anime.title}`}
            >
              <img
                src={anime.image_url}
                alt={anime.title}
                className="w-full h-48 object-cover rounded-t-lg"
                loading="lazy"
              />
              <div className="p-4">
                <h4 className="text-white font-semibold text-lg">{anime.title}</h4>
                <p className="text-xs text-gray-400 mt-2 line-clamp-2">{anime.synopsis}</p>
              </div>
            </div>
          ))}
        </div>

        {animeResults.length > 0 && (
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="p-3 text-yellow-400 cursor-pointer hover:bg-gray-700 text-sm font-medium border-t border-gray-700 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              Page précédente
            </button>
            <button
              onClick={handleNextPage}
              disabled={animeResults.length < 50}
              className="p-3 text-yellow-400 cursor-pointer hover:bg-gray-700 text-sm font-medium border-t border-gray-700 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              Page suivante
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
