import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Calendar, Clock, X, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ScheduleComponent = () => {
  const [schedules, setSchedules] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/schedule/');
        setSchedules(response.data.data || []);
      } catch (err) {
        console.error("Erreur lors de la récupération des données :", err);
        setError("Impossible de récupérer les données. Veuillez réessayer plus tard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setSelectedSchedule(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-yellow-400 text-lg font-medium">Chargement des horaires...</p>
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

  const ScheduleCard = ({ schedule }) => (
    <div
      onClick={() => setSelectedSchedule(schedule)}
      className="group relative bg-gray-800 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={schedule.images.jpg.image_url}
          alt={schedule.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{schedule.title}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">{schedule.aired.string}</span>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-semibold">{schedule.broadcast.time}</span>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2">
          {schedule.synopsis || "Synopsis indisponible."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 mb-12">
          Horaires des Animes 2025
        </h1>

        {/* Swiper Section */}
        <div className="mt-8">
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
            {schedules.map((schedule) => (
              <SwiperSlide key={schedule.mal_id}>
                <ScheduleCard schedule={schedule} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Modal */}
        {selectedSchedule && (
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
                      src={selectedSchedule.images.jpg.image_url}
                      alt={selectedSchedule.title}
                      className="w-48 rounded-lg shadow-lg"
                    />
                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <Calendar className="w-5 h-5 text-yellow-400" />
                      <span className="text-yellow-400 font-bold text-xl">
                        {selectedSchedule.aired.string}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{selectedSchedule.title}</h2>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{selectedSchedule.broadcast.time}</span>
                      </div>
                      <div className="mt-4 flex items-center space-x-2 text-yellow-400">
                        <Star className="w-5 h-5" />
                        <span className="text-xl font-semibold">{selectedSchedule.score}</span>
                        <span>({selectedSchedule.scored_by} évaluations)</span>
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white mb-2">Synopsis</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {selectedSchedule.synopsis || "Synopsis indisponible."}
                        </p>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Genres</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSchedule.genres.map((genre) => (
                            <span key={genre.mal_id} className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full">
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-semibold text-white mb-2">Producteurs</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedSchedule.producers.map((producer) => (
                            <a
                              key={producer.mal_id}
                              href={producer.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-gray-700 text-yellow-400 px-3 py-1 rounded-full hover:bg-yellow-500"
                            >
                              {producer.name}
                            </a>
                          ))}
                        </div>
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

export default ScheduleComponent;
