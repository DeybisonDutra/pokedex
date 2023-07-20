import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FavoriteProvider } from "./components/contexts/favoritesContext";

const favoritesKey = "f"
function Favoritos() {
  const [favorites, setFavorites] = useState([])

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }
  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const atualizarFavoritos = (name, pokemon) => {
    // Salva todos os favoritos na variável 'updateFavorites'
    const updateFavorites = [...favorites]

    // Verifica se o pokemon que foi clicado no botão de favoritos está na lista de favoritos 
    const favoriteIndex  = favorites.findIndex(favorito => favorito.id == pokemon.id)


    if (favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1);
    } else {
      updateFavorites.push(pokemon);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites);
  }

  return (
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        atualizarFavoritos: atualizarFavoritos,
      }}
    >
      <div>
        <Navbar />
        <div>
          <label> Favoritos</label>
          {favorites?.map(favorito => (
            <div>
              <label> {favorito} </label>
            </div>
          ))}
        </div>
      </div >
    </FavoriteProvider>
  );
}

export default Favoritos;


