import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Star, X, Calendar, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

const TopMediaComponent = () => {
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [topCharacters, setTopCharacters] = useState([]);
  const [topRecommendations, setTopRecommendations] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('anime');
  const threeContainer = useRef(null);
  const navigate = useNavigate();

  // Configuration Three.js pour l'arrière-plan animé
  useEffect(() => {
    if (!threeContainer.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.current.appendChild(renderer.domElement);

    // Création des particules animées
    const particles = new THREE.Group();
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({
      color: 0xFFD700,
      transparent: true,
      opacity: 0.6
    });

    for (let i = 0; i < 50; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        Math.random() * 20 - 10,
        Math.random() * 20 - 10,
        Math.random() * 20 - 10
      );
      particle.userData = {
        speed: Math.random() * 0.02
      };
      particles.add(particle);
    }

    scene.add(particles);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.001;

      particles.children.forEach(particle => {
        particle.position.y += particle.userData.speed;
        if (particle.position.y > 10) {
          particle.position.y = -10;
        }
        particle.rotation.x += 0.01;
        particle.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      threeContainer.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Logique de récupération des données
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

        await delay(1000);

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

        await delay(1000);

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

        await delay(1000);

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

  const navigateToAnimeDetail = (media) => {
    navigate(`/anime/${media.mal_id}`);
  };

  // Version améliorée de MediaCard avec Framer Motion
  const MediaCard = ({ media }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigateToAnimeDetail(media)}
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <motion.img
          src={media.images.jpg.image_url}
          alt={media.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"
        />
      </div>
      <motion.div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{media.title}</h3>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="flex items-center space-x-2 mb-3"
        >
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">{media.score || "N/A"}</span>
        </motion.div>
        <p className="text-gray-300 text-sm line-clamp-2">
          {media.synopsis || "Synopsis indisponible."}
        </p>
      </motion.div>
    </motion.div>
  );

  // Loading state amélioré avec Framer Motion
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center"
      >
        <motion.div
          className="flex flex-col items-center space-y-4"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-yellow-400 text-lg font-medium"
          >
            Chargement des médias...
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-red-500/10 p-6 rounded-lg border border-red-500"
        >
          <p className="text-red-500 text-lg font-medium">{error}</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div ref={threeContainer} className="absolute inset-0 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <motion.h1
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12"
        >
          Top Anime et Manga 2025
        </motion.h1>

        {/* Tabs avec animations */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mb-12"
        >
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            {['anime', 'manga', 'characters', 'recommendations'].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-yellow-400 text-gray-900 shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Sections Swiper avec animations */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          {/* Anime Swiper */}
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

          {/* Manga Swiper */}
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

          {/* Characters Swiper */}
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

          {/* Recommendations Swiper */}
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
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="w-full text-center text-gray-300"
                >
                  Aucune recommandation disponible.
                </motion.div>
              )}
            </Swiper>
          )}
        </motion.div>

        {/* Modal avec Framer Motion */}
        <AnimatePresence>
          {selectedMedia && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={e => e.stopPropagation()}
                className="bg-gray-800 rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-700/50 hover:bg-gray-700 transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-300" />
                  </motion.button>
                  <div className="flex flex-col md:flex-row p-6 gap-6">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex-shrink-0"
                    >
                      <img
                        src={selectedMedia.images.jpg.image_url}
                        alt={selectedMedia.title}
                        className="w-48 rounded-lg shadow-lg"
                      />
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 flex items-center justify-center space-x-2"
                      >
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold text-xl">
                          {selectedMedia.score || "N/A"}
                        </span>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="flex-1"
                    >
                      <h2 className="text-2xl font-bold text-white mb-4">{selectedMedia.title}</h2>
                      <div className="space-y-4">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="flex items-center space-x-2 text-gray-300"
                        >
                          <Calendar className="w-4 h-4" />
                          <span>{selectedMedia.aired?.string || selectedMedia.published?.string || "Date inconnue"}</span>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2 }}
                          className="flex items-center space-x-2 text-gray-300"
                        >
                          <Activity className="w-4 h-4" />
                          <span>{selectedMedia.status || "Statut inconnu"}</span>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center space-x-2 text-gray-300"
                        >
                          <Info className="w-4 h-4" />
                          <span>{selectedMedia.type || "Type inconnu"}</span>
                        </motion.div>
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="mt-6"
                        >
                          <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedMedia.synopsis || "Synopsis indisponible."}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default TopMediaComponent;