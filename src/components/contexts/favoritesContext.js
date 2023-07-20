import React from "react";
const FavoriteContext = React.createContext({
    favoritePokemons: [],
    atualizarFavoritos: (id) => null
});

export const FavoriteProvider = FavoriteContext.Provider

export default FavoriteContext;