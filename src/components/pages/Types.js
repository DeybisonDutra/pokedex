import Navbar from "../Navbar";
import { FavoriteProvider } from "../contexts/favoritesContext";
import React, { useEffect, useState } from "react";

function Types() {

  const favoritesKey = "f"
  const [favorites, setFavorites] = useState([])
  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }
  const atualizarFavoritos = (pokemon) => {
    // Salva todos os favoritos na variável 'updateFavorites'
    const updateFavorites = [...favorites]

    // Verifica se o pokemon que foi clicado no botão de favoritos está na lista de favoritos 
    const favoriteIndex = favorites.findIndex(favorito => favorito.id == pokemon.id)

    // Verifica se o pokemon existe ou não na lista de Favoritos, se existir o indice é 0 ou maior, se existir então remove
    if (favoriteIndex >= 0) {
      updateFavorites.splice(favoriteIndex, 1);
    }
    // Verifica se o pokemon existe ou não na lista de Favoritos, se existir o indice é -1, nesse caso adiciona o pokemon na lista de favoritos 
    else {
      updateFavorites.push(pokemon);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updateFavorites))
    setFavorites(updateFavorites);
  }

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  return (

    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        atualizarFavoritos: atualizarFavoritos,
      }}
    ><Navbar />
      <div>
        <h1>Tipos de Pokemon</h1>
      </div>

    </FavoriteProvider>
  )
}

export default Types;