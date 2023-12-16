import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Navbar from "../Navbar";
import Pokedex from "../Pokedex";
import { buscaPokemonPelotype, getPokemonData } from '../../api'
import { FavoriteProvider } from "../contexts/favoritesContext";



function Types() {

  const favoritesKey = "f"
  const [favorites, setFavorites] = useState([])
  const { id } = useParams();
  const [pokemons, setPokemons] = useState(null);
  
  const [page, setPage] = useState(0);
  
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
  useEffect(() =>{ 
    loadFavoritePokemons();
  }, []);


  useEffect(() => {
    async function fetchPokemonData() {
      const pokemonsPeloTipo = await buscaPokemonPelotype(id);
      const pokemonsDetalhado = pokemonsPeloTipo?.pokemon?.map(async (pokemon) => {
        return await getPokemonData(pokemon?.pokemon?.url);
      });
      const results = await Promise.all(pokemonsDetalhado);
      setPokemons(results);
      console.log('Pokemons detalhado ', pokemonsPeloTipo)
    }

    fetchPokemonData();
  }, [id]);

  return (
    <FavoriteProvider
    value={{
      favoritePokemons: favorites,
      atualizarFavoritos: atualizarFavoritos,
    }}
  ><Navbar />
    <div>      
      <Pokedex 
          pokemons={pokemons}
          page={page}
          setPage={setPage}
          
        />
    </div >
  </FavoriteProvider>
  )
}

export default Types;