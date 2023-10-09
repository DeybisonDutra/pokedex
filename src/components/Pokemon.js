import React, { useContext } from "react";
import FavoriteContext from "./contexts/favoritesContext";
import { Link } from "react-router-dom";


const Pokemon = (props) => {
    const { favoritePokemons, atualizarFavoritos } = useContext(FavoriteContext)
    const { pokemon } = props
    const favoriteIndex = favoritePokemons.findIndex(favorito => favorito.id == pokemon.id)
    const heart = favoriteIndex > -1 ? "❤️" : "🖤";

    const cliqueFavorito = () => {
        atualizarFavoritos(pokemon)
    }

    return (
        <div className="pokemon-card">
            <div className="pokemon-image-conteiner" />
            <Link to={`/pokemon/${pokemon.id}`}>
                <img
                    style={{ cursor: 'pointer' }}
                    alt={pokemon.name}
                    src={pokemon.sprites.versions?.['generation-v']?.['black-white'].animated.front_default}
                    className="pokemon-imege"
                />
            </Link>
            <div className="card-body">
                <div className="card-top" style={{ cursor: 'pointer' }}>
                    <h3>{pokemon.name}</h3>
                    <div>{pokemon.id}</div>
                </div>
                <div className="card-bottom">
                    <div className="pokemon-type" style={{ cursor: 'pointer' }} >
                        {pokemon.types.map((type, index) => {
                            return (
                                <Link to={`/tipos-pokemons/${pokemon.id}`}>
                                <div key={index} className="pokemon-type-text">{type.type.name}</div>
                                </Link>
                            )
                        })}
                    </ div>
                    <button className="pokemon-heart-btn" onClick={cliqueFavorito}>
                        {heart}
                    </button>
                </div>
            </div>
        </div>

    )


}

export default Pokemon;