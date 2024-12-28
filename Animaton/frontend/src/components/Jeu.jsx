import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Lock, Trophy, BookOpen, ExternalLink } from 'lucide-react';

const GameCard = ({ game, onHover }) => {
  const isDisabled = game.link === "#";
  
  return (
    <div
      className={`
        relative group overflow-hidden rounded-xl
        bg-gray-800 hover:bg-gray-700
        transform transition-all duration-500
        ${isDisabled ? 'opacity-75' : 'hover:-translate-y-2'}
      `}
      onMouseEnter={() => onHover(game.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Image container avec overlay */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10 opacity-60" />
        <img
          src={game.image}
          alt={game.nom}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        {isDisabled && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-75 z-20 flex items-center justify-center">
            <Lock className="w-12 h-12 text-gray-400" />
          </div>
        )}
        
        {/* Badge de statut */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`
            px-3 py-1 rounded-full text-sm font-medium
            ${isDisabled ? 
              'bg-gray-700 text-gray-300' : 
              'bg-green-500 text-white'
            }
          `}>
            {isDisabled ? 'Bientôt disponible' : 'Disponible'}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6 space-y-4">
        <h3 className="text-2xl font-bold text-white flex items-center gap-2">
          {game.id === 1 && <Play className="w-5 h-5" />}
          {game.id === 2 && <BookOpen className="w-5 h-5" />}
          {game.id === 3 && <Trophy className="w-5 h-5" />}
          {game.nom}
        </h3>

        <p className="text-gray-300 text-base leading-relaxed">
          {game.description}
        </p>

        <div className="pt-4">
          <Link
            to={game.link}
            className={`
              group/button inline-flex items-center gap-2
              px-6 py-3 rounded-lg font-medium
              transition-all duration-300
              ${isDisabled ?
                'bg-gray-700 text-gray-400 cursor-not-allowed' :
                'bg-blue-600 hover:bg-blue-500 text-white'
              }
            `}
            onClick={(e) => isDisabled && e.preventDefault()}
          >
            {game.id === 1 && 'Jouer au quiz'}
            {game.id === 2 && 'Découvrir'}
            {game.id === 3 && 'Participer au tournoi'}
            <ExternalLink className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const GamesSection = () => {
  const [hoveredGame, setHoveredGame] = useState(null);
  
  const games = [
    {
      id: 1,
      nom: "Quiz Anime",
      description: "Mettez vos connaissances à l'épreuve en devinant les animes à partir de leurs openings. Un défi musical pour les vrais fans !",
      image: "https://api.triviacreator.com/v1/imgs/quiz/Png-5eccea28-0663-4d48-b785-9ba8a1e3738b.png",
      link: "/Quiz/simple",
    },
    {
      id: 2,
      nom: "Guess the Character",
      description: "Un jeu de devinettes passionnant où vous devrez identifier les personnages d'anime à partir d'indices visuels et textuels.",
      image: "/img/minecraft.jpg",
      link: "/CharatereQuizz",
    },
    {
      id: 3,
      nom: "Tournoi Anime",
      description: "Participez à un tournoi épique où vos animes préférés s'affrontent. Votez et influencez le résultat final !",
      image: "https://i.ytimg.com/vi/ysCDmxObe8o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBbyajyMPOiST6S_vhz3ncZ99ElnA",
      link: "/tournoi",
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Choisis Ton Défi
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Teste tes connaissances et défie tes amis avec nos jeux d'anime
          </p>
        </div>

        {/* Grid de jeux */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onHover={setHoveredGame}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;