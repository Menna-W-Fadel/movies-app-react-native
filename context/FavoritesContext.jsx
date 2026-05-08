import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from storage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem('@user_favorites');
        if (stored) setFavorites(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load favorites", e);
      }
    };
    loadFavorites();
  }, []);

  const toggleFavorite = async (movie) => {
    let newFavorites;
    const isFav = favorites.some(fav => fav.id === movie.id);

    if (isFav) {
      newFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      newFavorites = [...favorites, movie];
    }

    setFavorites(newFavorites);
    try {
      await AsyncStorage.setItem('@user_favorites', JSON.stringify(newFavorites));
    } catch (e) {
      console.error("Failed to save favorites", e);
    }
  };

  const isFavorite = (movieId) => favorites.some(fav => fav.id === movieId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);