import { useState, useEffect } from "react";
import { FavoriteProvider } from "../contexts/favoritesContext";
import Navbar from "../Navbar";




function Favorites() {

  const favoritesKey = "f"

  const [favorites, setFavorites] = useState([])

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
    console.log(pokemons)
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
      <h1>Favorites</h1>
      <div className="pokedex-grid">
        {favorites.map(pokemon => {
          return (
            <div className="pokemon-card">
              <div className="pokemon-image-conteiner" />
              <img
                style={{ cursor: 'pointer' }}
                alt={pokemon.name}
                // src={pokemon.sprites.front_default}
                src={pokemon.sprites.versions?.['generation-v']?.['black-white'].animated.front_default}
                className="pokemon-imege"
              />
              <div className="card-body">
                <div className="card-top" style={{ cursor: 'pointer' }}></div>
                <h3>{pokemon.name}</h3>
                <div>{pokemon.id}</div>
              </div>
              <div className="card-bottom">
              <div className="pokemon-type" style={{ cursor: 'pointer' }} >
                  {pokemon.types.map((type, index) => {
                    return (
                      <div key={index} className="pokemon-type-text">{type.type.name}</div>
                    )
                  })}
                </ div>
              </div>

            </div>
          )
        })}
      </div>
    </FavoriteProvider>

  )
}

export default Favorites;