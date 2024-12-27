import React from "react";
import { Link } from "react-router-dom";

const Jeu = () => {
  const jeux = [
    {
      id: 1,
      nom: "BliendTest",
      description: "Trouver les anime à partir des openings.",
      image: "/img/league_of_legends.jpg",
      link: "#", // Link for the specific game
    },
    {
      id: 2,
      nom: "Guess Who is the Character",
      description: "Deviner qui est le personnage.",
      image: "/img/minecraft.jpg",
      link: "#", // Default link for this game
    },
    {
      id: 3,
      nom: "Tournoi Anime",
      description: "Participer au tournoi des anime.",
      image: "https://i.ytimg.com/vi/ysCDmxObe8o/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBbyajyMPOiST6S_vhz3ncZ99ElnA",
      link: "/tournoi", // Link for the specific game
    },
    // Add more games here as needed
  ];

  return (
    <section id="jeu" className="py-16 bg-gray-800 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-200 mb-8">Propositions de jeux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {jeux.map((jeu) => (
            <div
              key={jeu.id}
              className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300"
            >
              <img
                src={jeu.image}
                alt={jeu.nom}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h3 className="text-2xl font-semibold mb-2">{jeu.nom}</h3>
              <p className="text-lg leading-relaxed text-gray-300">{jeu.description}</p>
              <div className="mt-4">
                <Link
                  to={jeu.link}
                  className={`inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300 ${jeu.link === "#" ? "cursor-not-allowed opacity-50" : ""}`}
                  aria-disabled={jeu.link === "#"}
                >
                  {jeu.id === 1 ? "Aller au Tournoi" : "Découvrir"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jeu;
