import React, { useEffect, useState } from "react";
import "../../App.css";
import Navbar from "../Navbar";
import Searchbar from "../Searchbar";
import Pokedex from "../Pokedex";
import { getPokemonData, getPokemons, searchPokemon } from "../../api";
import { FavoriteProvider } from "../contexts/favoritesContext";



const favoritesKey = "f"
function Home() {

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFoud, setNotFoud] = useState(false);
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([])


  const itensPerPage = 27;
  const fetchPokemons = async () => {
    try {
      setLoading(true);
      setNotFoud(false);
      const data = await getPokemons(itensPerPage, itensPerPage * page);
      const promises = data.results.map(async (pokemon) => {
        return await getPokemonData(pokemon.url);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
      setLoading(false);
      setTotalPages(Math.ceil(data.count / itensPerPage))
    } catch (error) {
      console.log("fetchPokemons error:", error);
    }
  };

  const loadFavoritePokemons = () => {
    const pokemons = JSON.parse(window.localStorage.getItem(favoritesKey)) || []
    setFavorites(pokemons)
  }
  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  const atualizarFavoritos = (pokemon) => {
    // Salva todos os favoritos na variável 'updateFavorites'
    const updateFavorites = [...favorites]

    // Verifica se o pokemon que foi clicado no botão de favoritos está na lista de favoritos 
    const favoriteIndex  = favorites.findIndex(favorito => favorito.id == pokemon.id)

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

  const onSearchHandler = async (pokemon) => {
    if (!pokemon) {
      return fetchPokemons();
    }
    setLoading(true)
    setNotFoud(false)
    const result = await searchPokemon(pokemon)
    if (!result) {
      setNotFoud(true)
    } else {
      setPokemons([result])
      setPage(0)
      setTotalPages(1)
    }
    setLoading(false)

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
        <Searchbar onSearch={onSearchHandler} />
        {notFoud ? (
          <div class-name="not-found-text"> Pokemon não encontrado está extinto error?! </div>
        ) :
          (<Pokedex
            pokemons={pokemons}
            loading={loading}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
          />)}
      </div >
    </FavoriteProvider>

  );
}

export default Home;
