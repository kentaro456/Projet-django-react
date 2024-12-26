import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnimeDetail = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`);
        setAnime(response.data.data);
      } catch (err) {
        setError('Une erreur est survenue lors du chargement des détails de l\'anime.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center py-4">Chargement des détails de l'anime...</div>;
  if (error) return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <div className="container mx-auto px-6 py-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <img src={anime.images.jpg.image_url} alt={anime.title} className="w-64 h-96 object-cover rounded-md" />
          <div>
            <h1 className="text-4xl font-bold">{anime.title}</h1>
            <p className="mt-2">{anime.synopsis}</p>
            <p className="mt-2">Type: {anime.type}</p>
            <p className="mt-2">Statut: {anime.status}</p>
            <p className="mt-2">Nombre d'épisodes: {anime.episodes}</p>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Streaming:</h2>
              <ul className="list-disc list-inside">
                {anime.streaming.map((stream, index) => (
                  <li key={index} className="text-white">
                    <a href={stream.url} target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-500">
                      {stream.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold">Thèmes:</h2>
              <ul className="list-disc list-inside">
                {anime.themes.map((theme, index) => (
                  <li key={index} className="text-white">
                    {theme.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;