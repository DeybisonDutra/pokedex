import React from "react";
import Pokemon from "./Pokemon";
import Pagination from "./Pagination";
import { useMediaQuery } from 'react-responsive';

const Pokedex = (props) => {
    const { pokemons, loading, page, setPage, totalPages } = props;
    const isMobile = useMediaQuery({ query: '(max-width: 462px)' });

    const onLeftClickHandler = () => {
        if(page > 0) {
            setPage(page-1)
        }
    }
    const onRightClickHandler = () => {
        if(page+1 !== totalPages) {
            setPage(page+1)
        }
    }
    return (
        <div>
            <div className="pokedex-header">
                <h1>Pokedex</h1>                
                <Pagination
                   page={page+1}
                   totalPages={totalPages}
                   onLeftClick={onLeftClickHandler}
                   onRightClick={onRightClickHandler}
                />
                {/* <h2> CRIADOR Deybison Dutra</h2> */}
            </div>
            {loading ? (
                <div>Carregando, segura a fera...</div>
            ) : (
                <div className="pokedex-grid" style={{gridTemplateColumns: isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'}}>
                    {pokemons && pokemons.map((pokemon, index) => {
                        return (
                            <Pokemon key={index} pokemon={pokemon}/>                           
                        );
                    })}
                </div>
            )}
        </div >
    );
};

export default Pokedex;