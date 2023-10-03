import React, { useContext } from "react";
import FavoriteContext from "./contexts/favoritesContext";
import LinkButton from "../components/LinkButton"

const Navbar = () => {
    const { favoritePokemons } = useContext(FavoriteContext);
    const logoImg = "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
    const logooImg = "https://www.fatosdesconhecidos.com.br/wp-content/uploads/2016/08/04-6.png"
   
    const numeroFavoritonumero =() => {
      console.log('favoritePokemons 2 ', favoritePokemons);
        if(favoritePokemons.length == 0) {
          return"Nenhum Favorito🖤"
        }
        else if (favoritePokemons.length == 1) {
          return"1 Favorito❤️"
        }
        else {
          return `${favoritePokemons.length} Favoritos❤️`
        }
      }

    return (
        <nav>
      
            <a className=".btn" style={{ cursor: 'pointer' }}>               
              <LinkButton to="/"  text="Home" />
            </a>
            <div>
                <img alt="pokeapi-logo" src={logoImg} className="navbar-img" />
            </div>
            <div>
                <img alt="logooImg" src={logooImg} className="navbar-img" />
            </div>
            <a className="link-favoritos" href="/favoritos">{numeroFavoritonumero()} </a>
        </nav>
    );
};

export default Navbar;
//<a href="/favoritos" tatget= "_blank" >{numeroFavoritonumero()} Ir para o google </a> como fazer pra o linck abrir em nova aba