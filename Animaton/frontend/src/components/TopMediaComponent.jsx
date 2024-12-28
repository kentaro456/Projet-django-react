import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, X, Calendar, Activity, Info } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const TopMediaComponent = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [topRecommendations, setTopRecommendations] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('anime');

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedAnime = localStorage.getItem('topAnime');
        const cachedManga = localStorage.getItem('topManga');
        const cachedCharacters = localStorage.getItem('topCharacters');
        const cachedRecommendations = localStorage.getItem('topRecommendations');

        if (cachedAnime) {
          setTopAnime(JSON.parse(cachedAnime));
        } else {
          try {
            const animeResponse = await axios.get('http://127.0.0.1:8000/api/top-anime/');
            setTopAnime(animeResponse.data.data || []);
            localStorage.setItem('topAnime', JSON.stringify(animeResponse.data.data));
          } catch (err) {
            console.error("Erreur lors de la récupération des données d'anime :", err);
          }
        }

        await delay(1000); // Délai de 1 seconde

        if (cachedManga) {
          setTopManga(JSON.parse(cachedManga));
        } else {
          try {
            const mangaResponse = await axios.get('http://127.0.0.1:8000/api/top/manga/');
            setTopManga(mangaResponse.data.data || []);
            localStorage.setItem('topManga', JSON.stringify(mangaResponse.data.data));
          } catch (err) {
            console.error("Erreur lors de la récupération des données de manga :", err);
          }
        }

        await delay(1000); // Délai de 1 seconde

        if (cachedCharacters) {
          setTopCharacters(JSON.parse(cachedCharacters));
        } else {
          try {
            const charactersResponse = await axios.get('http://127.0.0.1:8000/api/top/characters/');
            setTopCharacters(charactersResponse.data.data || []);
            localStorage.setItem('topCharacters', JSON.stringify(charactersResponse.data.data));
          } catch (err) {
            console.error("Erreur lors de la récupération des données de personnages :", err);
          }
        }

        await delay(1000); // Délai de 1 seconde

        if (cachedRecommendations) {
          setTopRecommendations(JSON.parse(cachedRecommendations));
        } else {
          try {
            const recommendationsResponse = await axios.get('http://127.0.0.1:8000/api/recommendations/anime/');
            setTopRecommendations(recommendationsResponse.data.data || []);
            localStorage.setItem('topRecommendations', JSON.stringify(recommendationsResponse.data.data));
          } catch (err) {
            console.error("Erreur lors de la récupération des recommandations :", err);
          }
        }
      } catch (err) {
        console.error("Erreur générale :", err);
        setError("Impossible de récupérer les données. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setSelectedMedia(null);
  };

  const MediaCard = ({ media }) => (
    <div
      onClick={() => setSelectedMedia(media)}
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={media.images.jpg.image_url}
          alt={media.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{media.title}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">{media.score || "N/A"}</span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2">
          {media.synopsis || "Synopsis indisponible."}
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-400 text-lg font-medium">Chargement des médias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="bg-red-500/10 p-6 rounded-lg border border-red-500">
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
          Top Anime et Manga 2025
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('anime')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'anime'
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Anime
            </button>
            <button
              onClick={() => setActiveTab('manga')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'manga'
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Manga
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'characters'
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Characters
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                activeTab === 'recommendations'
                  ? 'bg-yellow-400 text-gray-900 shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Recommendations
            </button>
          </div>
        </div>

        {/* Swiper Sections */}
        <div className="mt-8">
          {/* Anime */}
          {activeTab === 'anime' && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {topAnime.map((anime) => (
                <SwiperSlide key={anime.mal_id}>
                  <MediaCard media={anime} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Manga */}
          {activeTab === 'manga' && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {topManga.map((manga) => (
                <SwiperSlide key={manga.mal_id}>
                  <MediaCard media={manga} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Characters */}
          {activeTab === 'characters' && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {topCharacters.map((character) => (
                <SwiperSlide key={character.mal_id}>
                  <MediaCard media={character} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Recommendations */}
          {activeTab === 'recommendations' && (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {topRecommendations.length > 0 ? (
                topRecommendations.map((recommendationData) =>
                  recommendationData.entry.map((recommendation) => (
                    <SwiperSlide key={recommendation.mal_id}>
                      <MediaCard media={recommendation} />
                    </SwiperSlide>
                  ))
                )
              ) : (
                <div className="w-full text-center text-gray-300">Aucune recommandation disponible.</div>
              )}
            </Swiper>
          )}
        </div>

        {/* Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="relative">
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-300" />
                </button>
                <div className="flex flex-col md:flex-row p-6 gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={selectedMedia.images.jpg.image_url}
                      alt={selectedMedia.title}
                      className="w-48 rounded-lg shadow-lg"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xl">
                        {selectedMedia.score || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedMedia.title}</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span>{selectedMedia.aired?.string || selectedMedia.published?.string || "Date inconnue"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Activity className="w-4 h-4" />
                        <span>{selectedMedia.status || "Statut inconnu"}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Info className="w-4 h-4" />
                        <span>{selectedMedia.type || "Type inconnu"}</span>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedMedia.synopsis || "Synopsis indisponible."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopMediaComponent;