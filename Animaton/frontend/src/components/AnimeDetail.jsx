import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Star,
  Calendar,
  PlayCircle,
  Users,
  Heart,
  Clock,
  Tv,
  ExternalLink
} from 'lucide-react';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [videos, setVideos] = useState([]);
  const [pictures, setPictures] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [news, setNews] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [themes, setThemes] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const cache = {}; // Cache centralisé pour les requêtes

  const fetchWithDelay = async (url, delay = 1000) => {
    if (cache[url]) {
      return cache[url];
    }
    await new Promise(resolve => setTimeout(resolve, delay));
    try {
      const response = await axios.get(url);
      cache[url] = response.data;
      return response.data;
    } catch (err) {
      console.error(`Erreur lors de la récupération des données depuis ${url}:`, err);
      throw err;
    }
  };

  const fetchAllData = async () => {
    try {
      const endpoints = [
        `https://api.jikan.moe/v4/anime/${id}/full`,
        `https://api.jikan.moe/v4/anime/${id}/videos`,
        `https://api.jikan.moe/v4/anime/${id}/pictures`,
        `https://api.jikan.moe/v4/anime/${id}/reviews`,
        `https://api.jikan.moe/v4/anime/${id}/news`,
        `https://api.jikan.moe/v4/anime/${id}/characters`,
        `https://api.jikan.moe/v4/anime/${id}/themes`,
        `https://api.jikan.moe/v4/anime/${id}/statistics`
      ];

      const results = await Promise.allSettled(
        endpoints.map((url, index) => fetchWithDelay(url, index * 1500))
      );

      if (results[0].status === 'fulfilled') setAnime(results[0].value.data);
      if (results[1].status === 'fulfilled') setVideos(results[1].value.data);
      if (results[2].status === 'fulfilled') setPictures(results[2].value.data);
      if (results[3].status === 'fulfilled') setReviews(results[3].value.data);
      if (results[4].status === 'fulfilled') setNews(results[4].value.data);
      if (results[5].status === 'fulfilled') setCharacters(results[5].value.data);
      if (results[6].status === 'fulfilled') {
        console.log('Themes data:', results[6].value.data); // Ajoutez ce log
        setThemes(results[6].value.data);
      }
      if (results[7].status === 'fulfilled') setStatistics(results[7].value.data);

      const errors = results.filter(result => result.status === 'rejected');
      if (errors.length > 0) {
        console.warn("Certaines données n'ont pas pu être chargées :', errors")
      }
    } catch (err) {
      setError('Une erreur est survenue lors du chargement des données.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [id]);

  const LoadingSkeleton = () => (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-64 h-96 rounded-lg bg-gray-700 animate-pulse"></div>
          <div className="flex-1 space-y-4">
            <div className="h-10 w-3/4 bg-gray-700 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-700 animate-pulse"></div>
            <div className="h-4 w-full bg-gray-700 animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-700 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingSkeleton />;
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-red-500 text-center py-8 bg-red-500/10 rounded-lg mx-4"
    >
      {error}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 min-h-screen bg-gray-900"
    >
      {/* Header Section */}
      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="relative h-64 overflow-hidden">
          <div
            className="absolute inset-0 bg-center bg-cover blur-sm"
            style={{
              backgroundImage: `url(${anime.images.jpg.large_image_url})`,
              filter: 'brightness(0.3)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-4xl font-bold text-white mb-2">{anime.title}</h1>
            <p className="text-gray-300">{anime.title_japanese}</p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3 lg:w-1/4">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                className="w-full rounded-lg shadow-lg"
              />

              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <span className="text-xl font-bold text-white">{anime.score}</span>
                  <span className="text-gray-400">({anime.scored_by.toLocaleString()} votes)</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard
                    icon={<Users className="w-4 h-4" />}
                    label="Rank"
                    value={`#${anime.rank}`}
                  />
                  <InfoCard
                    icon={<Heart className="w-4 h-4" />}
                    label="Popularity"
                    value={`#${anime.popularity}`}
                  />
                  <InfoCard
                    icon={<Clock className="w-4 h-4" />}
                    label="Duration"
                    value={anime.duration}
                  />
                  <InfoCard
                    icon={<Tv className="w-4 h-4" />}
                    label="Episodes"
                    value={anime.episodes}
                  />
                </div>
              </div>
            </div>

            <div className="md:w-2/3 lg:w-3/4">
              <div className="mb-4 flex space-x-4 border-b border-gray-700 pb-2">
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'overview' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Vue d'ensemble
                </button>
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'media' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('media')}
                >
                  Média
                </button>
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'reviews' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('reviews')}
                >
                  Critiques
                </button>
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'news' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('news')}
                >
                  Actualités
                </button>
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'characters' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('characters')}
                >
                  Personnages
                </button>
                <button
                  className={`text-white font-semibold px-4 py-2 rounded-lg focus:outline-none ${activeTab === 'themes' ? 'bg-gray-700' : ''}`}
                  onClick={() => setActiveTab('themes')}
                >
                  Thèmes
                </button>
              </div>

              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Synopsis</h3>
                    <p className="text-gray-300 leading-relaxed">{anime.synopsis}</p>
                  </div>

                  {anime.streaming?.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Streaming</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {anime.streaming.map((stream, index) => (
                          <motion.a
                            key={index}
                            href={stream.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <ExternalLink className="w-4 h-4 text-yellow-400" />
                            <span className="text-white">{stream.name}</span>
                          </motion.a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'media' && (
                <div className="space-y-6">
                  {videos.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Vidéos</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {videos.map((video, index) => (
                          <div key={index} className="relative aspect-video">
                            <img
                              src={video.images.jpg.image_url}
                              alt={video.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <PlayCircle className="w-12 h-12 text-white opacity-80" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {pictures.length > 0 && (
                    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Images</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {pictures.map((picture, index) => (
                          <img
                            key={index}
                            src={picture.jpg.image_url}
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                  {reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-700 pb-6 last:border-0">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={review.user.images.jpg.image_url}
                          alt={review.user.username}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <h4 className="text-white font-semibold">{review.user.username}</h4>
                          <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span>{review.score}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-300">{review.review}</p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'news' && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                  {news.map((newsItem, index) => (
                    <motion.a
                      key={index}
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={newsItem.images.jpg.image_url}
                          alt={newsItem.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-white font-semibold text-lg">{newsItem.title}</h4>
                          <p className="text-gray-400 text-sm">{newsItem.date}</p>
                        </div>
                      </div>
                      <p className="text-gray-300 mt-2 leading-relaxed">
                        {newsItem.intro}
                      </p>
                    </motion.a>
                  ))}
                </div>
              )}

              {activeTab === 'characters' && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Personnages</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {characters.map((character, index) => (
                      <div key={index} className="text-center">
                        <img
                          src={character.character.images.jpg.image_url}
                          alt={character.character.name}
                          className="w-full h-48 object-cover rounded-lg mb-2"
                        />
                        <h4 className="text-white font-semibold">{character.character.name}</h4>
                        <p className="text-gray-400">{character.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'themes' && (
                <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Thèmes</h3>
                  {Array.isArray(themes) ? (
                    <div className="flex flex-wrap gap-2">
                      {themes.map((theme, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                        >
                          {theme.name}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>Aucun thème disponible.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2 bg-gray-700 p-3 rounded-lg">
    <div className="flex items-center justify-center w-8 h-8 bg-gray-600 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-400">{label}</p>
      <p className="text-white font-semibold">{value}</p>
    </div>
  </div>
);

export default AnimeDetail;