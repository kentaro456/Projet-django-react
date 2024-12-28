import React, { useEffect, useState } from "react";
import { AlertCircle, Check, X, RefreshCw, Loader2, SkipForward } from "lucide-react";
import { motion } from "framer-motion";

const CharacterQuiz = () => {
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState(null);
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [cache, setCache] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchCharacter = async () => {
    setLoading(true);
    setError(null);
    setShowAnswer(false);

    try {
      const randomResponse = await fetch("https://api.jikan.moe/v4/random/characters");
      const randomData = await randomResponse.json();
      const characterId = randomData.data.mal_id;

      if (cache[characterId]) {
        setCharacter(cache[characterId]);
        setLoading(false);
        return;
      }

      const fullResponse = await fetch(`https://api.jikan.moe/v4/characters/${characterId}/full`);
      const fullData = await fullResponse.json();

      const characterData = {
        ...fullData.data,
        images: fullData.data.images,
        anime: fullData.data.anime.length > 0 ? fullData.data.anime[0].anime : null,
        role: fullData.data.anime.length > 0 ? fullData.data.anime[0].role : "Inconnu",
        animeImage: fullData.data.anime.length > 0 ? fullData.data.anime[0].anime.images.jpg.image_url : null
      };

      if (!characterData.images?.jpg?.image_url) {
        throw new Error("Image non disponible");
      }

      setCache((prev) => ({ ...prev, [characterId]: characterData }));
      setCharacter(characterData);
    } catch (err) {
      if (err.message === "Image non disponible") {
        fetchCharacter();
      } else {
        setError("Erreur de chargement. Veuillez réessayer.");
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  const handleGuess = (e) => {
    e.preventDefault();
    if (!guess.trim()) return;

    const isGuessCorrect = guess.trim().toLowerCase() === character.name.toLowerCase();
    setIsCorrect(isGuessCorrect);
    if (isGuessCorrect) {
      setStreak((prev) => prev + 1);
      setScore((prev) => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setGuess("");
    setIsCorrect(null);
    fetchCharacter();
  };

  const handleSkip = () => {
    setGuess("");
    setIsCorrect(null);
    fetchCharacter();
  };

  const generateHint = (name) => {
    const firstThreeLetters = name.slice(0, 3);
    const remainingLetters = name.slice(3).replace(/[a-zA-Z]/g, "_");
    return `${firstThreeLetters}${remainingLetters}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
          <p className="text-gray-600">Chargement du personnage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Quiz Anime Characters
          </h1>

          <div className="text-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              Score: {score}
            </span>
          </div>

          {error ? (
            <div className="flex items-center p-4 mb-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {streak > 0 && (
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    Série: {streak} 🔥
                  </span>
                </div>
              )}

              {score >= 20 && (
                <div className="text-center">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                    Félicitations ! Vous avez gagné avec un score de {score} ! 🎉
                  </span>
                </div>
              )}

              {character?.images?.jpg?.image_url && (
                <div className="flex justify-center">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={character.images.jpg.image_url}
                    alt="Character"
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                    onError={handleNext}
                  />
                </div>
              )}

              <div className="text-center">
                <p className="text-lg text-gray-600">
                  Indice : {character?.anime?.title || "Inconnu"} - Rôle : {character?.role || "Inconnu"}
                </p>
                <p className="text-lg text-gray-600">
                  Indice de nom : {generateHint(character?.name || "")}
                </p>
              </div>

              {character?.animeImage && (
                <div className="flex justify-center mt-4">
                  <motion.img
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={character.animeImage}
                    alt="Anime Image"
                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                  />
                </div>
              )}

              <form onSubmit={handleGuess} className="space-y-4">
                <input
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  placeholder="Nom du personnage"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  disabled={isCorrect !== null}
                />

                <div className="flex gap-2">
                  <motion.button
                    type="submit"
                    disabled={isCorrect !== null || !guess.trim()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Vérifier
                  </motion.button>

                  {!showAnswer && isCorrect === false && (
                    <motion.button
                      type="button"
                      onClick={() => setShowAnswer(true)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Voir la réponse
                    </motion.button>
                  )}
                </div>
              </form>

              {isCorrect !== null && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}
                >
                  {isCorrect ? (
                    <div className="flex items-center text-green-700">
                      <Check className="w-5 h-5 mr-2" />
                      Bravo ! C'est la bonne réponse !
                    </div>
                  ) : (
                    <div className="flex items-center text-red-700">
                      <X className="w-5 h-5 mr-2" />
                      {showAnswer ? (
                        `La réponse était : ${character.name}`
                      ) : (
                        "Ce n'est pas la bonne réponse, essayez encore !"
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              <div className="flex justify-between items-center">
                <motion.button
                  onClick={handleSkip}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition-colors flex items-center gap-2"
                >
                  <SkipForward className="w-4 h-4" />
                  Passer
                </motion.button>

                {(isCorrect !== null || showAnswer) && (
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition-colors flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Personnage suivant
                  </motion.button>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterQuiz;