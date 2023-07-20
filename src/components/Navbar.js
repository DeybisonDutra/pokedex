import React, { useContext } from "react";
import FavoriteContext from "./contexts/favoritesContext";

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);
    const logoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    const logooImg = "https://www.fatosdesconhecidos.com.br/wp-content/uploads/2016/08/04-6.png"


    return (
        <nav>
            <div>
                <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
            </div>
            <div>
                <img alt="logooImg" src={logooImg} className="navbar-img" />
            </div>
            <a href="/favoritos">{favoritePokemons.length} Favoritos ❤️</a>
        </nav>
    );
};

export default Navbar;