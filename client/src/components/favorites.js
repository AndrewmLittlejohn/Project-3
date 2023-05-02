//This code goes in the Favorites.js file: includes local storage.

import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const updateLocalStorage = (updatedFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const handleAddFavorite = (symbol) => {
    if (!favorites.includes(symbol)) {
      const updatedFavorites = [...favorites, symbol];
      setFavorites(updatedFavorites);
      updateLocalStorage(updatedFavorites);
    }
  };

  const handleRemoveFavorite = (symbol) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== symbol);
    setFavorites(updatedFavorites);
    updateLocalStorage(updatedFavorites);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <List>
        {favorites.map((symbol) => (
          <ListItem key={symbol}>
            <ListItemText primary={symbol} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="delete" onClick={() => handleRemoveFavorite(symbol)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
export default Favorites;



