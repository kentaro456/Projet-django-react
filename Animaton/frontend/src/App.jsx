import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/NavBar';
import TopMediaComponent from './components/TopMediaComponent';
import Hero from './components/Hero';
import AnimeDetail from './components/AnimeDetail';
import NotFound from './components/NotFound';
import ScheduleComponent from './components/ScheduleComponent';
import SearchResultsPage from './components/SearchResultsPage';
import Footer from './components/Footer';
import About from './components/About';
import Jeu from './components/Jeu';

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
  return (
    <Router>
      <div className="bg-gray-900 min-h-screen flex flex-col">
        {/* Navbar persistante sur toutes les pages */}
        <NavBar />

        {/* Routes */}
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

        {/* Footer persistante sur toutes les pages */}
        <Footer />
      </div>
    </Router>
  );
};


export default App;