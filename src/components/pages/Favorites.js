import { useState, useEffect } from "react";
import { FavoriteProvider } from "../contexts/favoritesContext";
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import { useMediaQuery } from 'react-responsive';
import './Favorites.css'



function Favorites() {


  const favoritesKey = "f"

  const isMobile = useMediaQuery({ query: '(max-width: 462px)' });

  const [favorites, setFavorites] = useState([])

  const heart = "❤️";

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

  const numeroFavorito =() => {
    if(favorites.length == 0) {
      return"Nenhum Favorito🖤"
    }
    else if (favorites.length == 1) {
      return"1 Favorito"
    }
    else {
      return `${favorites.length} Favoritos`
    }
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
      <div className="navbar-h1-favorito">
        <h1>{numeroFavorito()}</h1>
      </div>
      <div className="pokedex-grid-favorito"style={{gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}}>
        {favorites.map(pokemon => {
          return (
            <div className="pokemon-card-favorito">
              <div className="pokemon-image-conteiner-favorito" />
              <Link to={`/pokemon/${pokemon.id}`}>
              <img
                style={{ cursor: 'pointer' }}
                alt={pokemon.name}
                src={pokemon.sprites.versions?.['generation-v']?.['black-white'].animated.front_default}
                className="pokemon-imege"
              />
              </Link>
              <div className="card-body-favorito">
                <div className="card-top-favorito" style={{ cursor: 'pointer' }}>
                  <h3>{pokemon.name}</h3>
                  <div>{pokemon.id}</div>
                </div>
                <div className="card-bottom-favorito">
                  <div className="pokemon-type-favorito" style={{ cursor: 'pointer' }} >
                    {pokemon.types.map((type, index) => {
                      return (
                        <Link to={`/tipos-pokemons/${pokemon.id}`}>
                        <div key={index} className="pokemon-type-text-favorito">{type.type.name}</div>
                        </Link>
                      )
                    })}
                  </ div>
                  <button className="pokemon-heart-btn-favorito" onClick={() => atualizarFavoritos(pokemon)}>
                {heart}
              </button>
                </ div>
              </div>
              
            </div>
          )
        })}
      </div>
    </FavoriteProvider >

  )
}

export default Favorites;