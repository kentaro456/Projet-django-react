import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { Search, Loader2, ChevronDown } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/';

const api = {
  get: (endpoint, params = {}) =>
    axios.get(`${API_BASE_URL}${endpoint}/`, {
      params,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(res => res.data),
};

const CategoriesWheel = ({ selectedCategory, setSelectedCategory, setSelectedQuestion }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => api.get('categories'),
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCategorySelect = (category) => {
    if (!isSpinning) {
      setSelectedItem(category);
      setSelectedCategory(category.id);
      setSelectedQuestion(null);
      setShowConfetti(true);
      setIsDropdownOpen(false);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const spinWheel = () => {
    if (!isSpinning && data?.length) {
      setIsSpinning(true);
      setSelectedItem(null);

      const spins = (Math.floor(Math.random() * 3) + 5) * 360;
      const randomAngle = Math.random() * 360;
      const totalRotation = spins + randomAngle;

      const segmentSize = 360 / data.length;
      const finalPosition = randomAngle % 360;
      const winningIndex = Math.floor(finalPosition / segmentSize);
      const winningCategory = data[winningIndex];

      setRotationAngle(prev => prev + totalRotation);

      setTimeout(() => {
        handleCategorySelect(winningCategory);
        setIsSpinning(false);
      }, 5000);
    }
  };

  const filteredCategories = data?.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Erreur: {error.message || 'Impossible de charger les catégories'}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-8 p-8">
      {/* Category Selector */}
      <div className="w-full max-w-md">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm flex items-center justify-between hover:border-blue-500 transition-colors"
          >
            <span className="text-gray-700">
              {selectedItem ? selectedItem.name : 'Choisir une catégorie'}
            </span>
            <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-xl"
              >
                <div className="p-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher une catégorie..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredCategories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category)}
                      className="w-full px-4 py-2 text-left hover:bg-blue-50 focus:bg-blue-50 transition-colors"
                    >
                      <span className="font-medium text-gray-700">{category.name}</span>
                      {category.description && (
                        <p className="text-sm text-gray-500 truncate">{category.description}</p>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative w-96 h-96">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-pulse" />
        
        <motion.div
          className="absolute inset-0 bg-white rounded-full shadow-2xl"
          style={{
            transformOrigin: 'center',
            rotateZ: rotationAngle,
          }}
          animate={{
            rotate: rotationAngle
          }}
          transition={{
            duration: 5,
            ease: "easeInOut"
          }}
        >
          {data?.map((category, index) => {
            const angle = (360 / data.length) * index;
            return (
              <motion.div
                key={category.id}
                className={`absolute w-24 h-24 -ml-12 -mt-12 flex items-center justify-center cursor-pointer
                  ${selectedCategory === category.id ? 'ring-4 ring-blue-500 ring-opacity-50' : ''}
                  transform hover:scale-105 transition-transform duration-200`}
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${angle}deg) translateY(-120px) rotate(-${angle}deg)`,
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => handleCategorySelect(category)}
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center p-2 border-2 border-blue-100">
                  <p className="text-sm font-medium text-center text-gray-700 break-words">
                    {category.name}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg
              flex items-center justify-center cursor-pointer disabled:opacity-50"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">🎲</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="p-6 bg-white rounded-xl shadow-xl text-center max-w-md"
          >
            <h4 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {selectedItem.name}
            </h4>
            <p className="text-gray-600 mt-2">{selectedItem.description}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={spinWheel}
        disabled={isSpinning}
        className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg
          shadow-lg disabled:opacity-50 font-medium text-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSpinning ? 'La roue tourne...' : 'Faire tourner la roue'}
      </motion.button>
    </div>
  );
};

export default CategoriesWheel;