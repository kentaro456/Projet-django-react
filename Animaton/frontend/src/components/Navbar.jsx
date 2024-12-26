import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import { debounce } from 'lodash';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [animeResults, setAnimeResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const [isAtEndOfScroll, setIsAtEndOfScroll] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const debouncedSearch = useRef(
    debounce(async (query) => {
      if (!query.trim()) {
        setAnimeResults([]);
        setTotalResults(0);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:8000/api/recherche/`, {
          params: { q: query, sfw: true, limit: 10 },
        });

        const previewResults = response.data.anime_results.map((anime) => ({
          id: anime.id,
          title: anime.title,
          image_url: anime.image_url,
          synopsis: anime.synopsis?.substring(0, 100) + '...',
        }));

        setAnimeResults(previewResults);
        setTotalResults(response.data.total_count || previewResults.length);
        setError(null);
      } catch (err) {
        setError('Une erreur est survenue lors de la recherche.');
      } finally {
        setLoading(false);
      }
    }, 500)
  ).current;

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setAnimeResults([]);
        setSearchQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (animeId) => {
    navigate(`/anime/${animeId}`);
    setSearchQuery('');
    setAnimeResults([]);
  };

  const handleViewAllResults = () => {
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setAnimeResults([]);
  };

  const handleScroll = (event) => {
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setIsAtEndOfScroll(true);
    } else {
      setIsAtEndOfScroll(false);
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-yellow-400 hover:text-yellow-500">
          Animaton
        </Link>
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-lg hover:text-yellow-400">Accueil</Link>
          <Link to="/schedules" className="text-lg hover:text-yellow-400">A venir</Link>
          <Link to="/jeu" className="text-lg hover:text-yellow-400">Jeu</Link>
          <Link to="/contact" className="text-lg hover:text-yellow-400">Contact</Link>

          <div ref={searchRef} className="relative">
            <div className="flex items-center border-b-2 border-yellow-400">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher..."
                className="bg-transparent text-white placeholder-gray-400 focus:outline-none w-64 px-2 py-1"
              />
              <FaSearch className="text-yellow-400 ml-2" />
            </div>

            {(loading || animeResults.length > 0 || error) && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 w-72 bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
              >
                {loading && (
                  <div className="flex justify-center p-4">
                    <div className="animate-spin w-6 h-6 border-4 border-yellow-400 border-t-transparent rounded-full"></div>
                  </div>
                )}

                {error && <div className="p-4 text-red-500 text-center">{error}</div>}

                <div
                  className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-yellow-400 scrollbar-track-gray-700"
                  onScroll={handleScroll}
                >
                  {!loading &&
                    animeResults.map((anime, index) => (
                      <div
                        key={index}
                        onClick={() => handleResultClick(anime.id)}
                        className="flex items-center p-3 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-0"
                      >
                        <img
                          src={anime.image_url}
                          alt={anime.title}
                          className="w-12 h-16 object-cover rounded"
                          loading="lazy"
                        />
                        <div className="ml-3 flex-1 min-w-0">
                          <h4 className="text-white font-semibold truncate">{anime.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2">{anime.synopsis}</p>
                        </div>
                      </div>
                    ))}
                </div>

                  <div
                    onClick={handleViewAllResults}
                    className={`p-3 text-center text-yellow-400 cursor-pointer hover:bg-gray-700 text-sm font-medium border-t border-gray-700 ${
                      isAtEndOfScroll ? 'bg-gray-700' : ''
                    }`}
                  >
                    Voir tous les résultats ({totalResults})
                  </div>
               
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-yellow-400 focus:outline-none"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
