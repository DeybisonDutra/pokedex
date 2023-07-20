import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from '../components/pages/Home';
import Details from '../components/pages/Details';
import Types from '../components/pages/Types';
import Favorites from '../components/pages/Favorites';

const Routas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favorites />} />
        <Route path="/pokemon/:id" element={<Details />} />
        <Route path="/tipos-pokemons/:id" element={<Types />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routas;
