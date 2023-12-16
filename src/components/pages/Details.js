
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar";
import { buscaPokemonPeloID } from '../../api'
import { FavoriteProvider } from "../contexts/favoritesContext";
import styles from './Details.module.css'
import { FcChargeBattery, FcCollect, FcProcess, FcOk } from "react-icons/fc";
import { BsSnow3 } from "react-icons/bs";
import { FaBomb } from "react-icons/fa"
import { GiWhirlpoolShuriken } from 'react-icons/gi'

function Details() {

  const favoritesKey = "f"
  const [favorites, setFavorites] = useState([])
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);

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
  // O useEffect é executado quando a página é criada, nesse caso é a página de detalhes
  // Pra ficar mais claro, no momento que a página é criada uma ou mais funções que estiverem dentro do useEffect é executa
  useEffect(() => {
    async function fetchPokemonData() {
      const data = await buscaPokemonPeloID(id);
      setPokemon(data);
      console.log('dados do pokemon ', data)
    }

    fetchPokemonData();
  }, []);

  return (

    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        atualizarFavoritos: atualizarFavoritos,
      }}
    ><Navbar />
      {pokemon && (
        <>
          <div className={styles.inicio}>
            <h1> Detalhes do Pokemon </h1>
          </div>

          <div className={styles.topo}>
            <div className={styles.primeiropasso}>
              <div className={styles.cardImage}>
                <img className={styles.fotos} src={pokemon.sprites.front_default} alt={pokemon.name}></img>
              </div>

              <div className={styles.name}>
                <h1>{pokemon.name.substr(0, 14)}</h1>
              </div>
              <br></br>
              <div className={styles.texto}>
                <FcChargeBattery /> Type: {pokemon.type}
                <br></br>
                <BsSnow3 color="#259dd9" /> Peso: {pokemon.weight}
                <br></br>
                <FaBomb color="#f00000" /> Pokemon: {pokemon.id}
                <br></br>
                < GiWhirlpoolShuriken color="#0000ff" /> base_experience: {pokemon.base_experience}
              </div>
            </div>
          </div>
        </>
      )}
    </FavoriteProvider>
  )
}

export default Details;