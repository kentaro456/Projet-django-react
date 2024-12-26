import React from "react";

const Jeu = () => {
  const jeux = [
    {
      id: 1,
      nom: "BliendTest",
      description: "trouver les les anime a partie des openinig",
      image: "/img/league_of_legends.jpg",
    },
    {
      id: 2,
      nom: "Guess Who is the charatere",
      description: "deviner qui est le personnage",
      image: "/img/minecraft.jpg",
    },
    {
      id: 3,
      nom: "Apres je sais pas ",
      description: "trouve un autre jeu",
      image: "/img/fortnite.jpg",
    },
    // Ajoutez d'autres jeux ici
  ];

  return (
   
    <section id="jeu" className="py-16 bg-gray-800 text-white">
        <h1>Maxime tu te debrouille pour cree des jeu</h1>
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Propositions de jeux</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jeux.map((jeu) => (
            <div key={jeu.id} className="bg-gray-700 p-6 rounded-lg shadow-lg hover:bg-gray-600 transition-colors duration-300">
              <img src={jeu.image} alt={jeu.nom} className="w-full h-48 object-cover mb-4 rounded-lg" />
              <h3 className="text-2xl font-semibold mb-2">{jeu.nom}</h3>
              <p className="text-lg leading-relaxed">{jeu.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jeu;
