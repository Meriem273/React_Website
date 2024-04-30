import React, { useContext, useEffect, useState } from "react";
import styles from "./App.module.scss";
import ProduitFavorisContext from "./contexts/produitFavorisContext";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  const [produitsFavoris, setProduitsFavoris] = useState([]);
  const [page, setPage] = useState("home");
  // Si l'item est dans la liste on l'enlève
  // Sinon on l'ajoute
  const handleAjusterProduitFavoris = (item) => {
    let result = produitsFavoris.filter((t) => t._id === item._id);
    if (result.length > 0)
      setProduitsFavoris(produitsFavoris.filter((t) => t._id !== item._id));
    else setProduitsFavoris([...produitsFavoris, item]);
  };

  return (
    <div className={`${styles.app_container} d-flex flex-column`}>
      <ProduitFavorisContext.Provider
        value={{ data: produitsFavoris, setData: handleAjusterProduitFavoris }}
      >
        <Header setProduitsFavoris={setProduitsFavoris} setPage={setPage} />
        <Banner />

        <Outlet />
      </ProduitFavorisContext.Provider>
      <Footer />
    </div>
  );
};

export default App;
