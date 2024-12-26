import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

// Composants chargés de manière paresseuse
const Hero = lazy(() => import('./components/Hero'));
const TopMediaComponent = lazy(() => import('./components/TopMediaComponent'));
const AnimeDetail = lazy(() => import('./components/AnimeDetail'));
const NotFound = lazy(() => import('./components/NotFound'));
const ScheduleComponent = lazy(() => import('./components/ScheduleComponent'));
const SearchResultsPage = lazy(() => import('./components/SearchResultsPage'));
const About = lazy(() => import('./components/About'));
const Jeu = lazy(() => import('./components/Jeu'));

// Composant pour changer le titre de la page en fonction de la route
const ScrollToTopAndSetTitle = ({ title }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll vers le haut à chaque changement de route
    document.title = title; // Mise à jour du titre de la page
  }, [location, title]);

  return null;
};

const App = () => {
  const [loading, setLoading] = useState(true); // Ajout de l'état de chargement

  useEffect(() => {
    // Simuler un délai de chargement avant d'afficher le contenu (3 secondes ici)
    const timer = setTimeout(() => {
      setLoading(false); // Fin du chargement après 3 secondes
    }, 3000);

    return () => clearTimeout(timer); // Nettoyage de l'effet si le composant est démonté
  }, []);

  return (
    <Router>
      <div className="bg-gray-900 min-h-screen flex flex-col">
        {/* Navbar persistante sur toutes les pages */}
        <NavBar />

        {/* Si la page est en train de charger, afficher le loader */}
        {loading ? (
          <div className="flex justify-center items-center h-screen bg-gray-900 bg-opacity-75">
            <div className="flex flex-col items-center">
              {/* Spinner animé */}
              <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
              <p className="text-white mt-4 text-xl">Chargement... Patientez un instant</p>
            </div>
          </div>
        ) : (
          // Routes disponibles une fois que le chargement est terminé
          <Suspense fallback={<div>Chargement...</div>}>
            <Routes>
              {/* Page d'accueil */}
              <Route
                path="/"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Accueil - Top Anime et Manga" />
                    <Hero /> {/* Affiche le Hero uniquement sur la page d'accueil */}
                    <TopMediaComponent /> {/* Top Media peut être affiché ici */}
                  </>
                }
              />

              {/* Page des Top Anime et Manga */}
              <Route
                path="/top-media"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Top Anime et Manga - 2025" />
                    <TopMediaComponent />
                  </>
                }
              />

              {/* Page des horaires */}
              <Route
                path="/schedules"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Horaires des Animes - 2025" />
                    <ScheduleComponent />
                  </>
                }
              />

              {/* Page de détails de l'Anime */}
              <Route
                path="/anime/:id"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Détails de l'anime" />
                    <AnimeDetail />
                  </>
                }
              />

              {/* Page des résultats de recherche */}
              <Route
                path="/search-results"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Résultats de recherche" />
                    <SearchResultsPage />
                  </>
                }
              />

              {/* Page À propos */}
              <Route
                path="/about"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="À propos de nous" />
                    <About />
                  </>
                }
              />

              {/* Page Jeu */}
              <Route
                path="/jeu"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Propositions de jeux" />
                    <Jeu />
                  </>
                }
              />

              {/* Page non trouvée (404) */}
              <Route
                path="*"
                element={
                  <>
                    <ScrollToTopAndSetTitle title="Page non trouvée" />
                    <NotFound />
                  </>
                }
              />
            </Routes>
          </Suspense>
        )}

        {/* Footer persistante sur toutes les pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
