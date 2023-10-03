
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Navbar from "../Navbar";
import { buscaPokemonPeloID } from '../../api'
import styles from './Details.module.css'
import { FcChargeBattery, FcCollect, FcProcess, FcOk } from "react-icons/fc";
import { BsSnow3 } from "react-icons/bs";
import {FaBomb} from "react-icons/fa"
import {GiWhirlpoolShuriken} from 'react-icons/gi'


function Details() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  
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
    <>
      <Navbar />
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
                <h1>{pokemon.name}</h1>
                </div>
                <br></br>
                <div className={styles.texto}>
                <FcChargeBattery /> Type: {pokemon.type}
                <br></br>
                <BsSnow3 color="#259dd9" /> Peso: {pokemon.weight}
                <br></br>
                <FaBomb color="#f00000" /> Pokemon: {pokemon.id}
                <br></br>
                < GiWhirlpoolShuriken color="#0000ff"/> base_experience: {pokemon.base_experience}
              </div>
            </div>
          </div>
        </>
      )}
    </>



  )
}

export default Details;