import React, { useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import styles from "./Header.module.scss";
import { users } from "../../data/data";
import ProduitFavorisContext from "../../contexts/produitFavorisContext";
import Logo from "./components/Logo/Logo";
import User from "./components/User/User";
import HeaderMenu from "./components/HeaderMenu/HeaderMenu";
import Connexion from "./components/Connexion/Connexion";
import { NavLink } from "react-router-dom";

const Header = ({ setProduitsFavoris }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showConnexion, setShowConnexion] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [user, setUser] = useState(null);
  const produitsFavorisContext = useContext(ProduitFavorisContext);

  const handleOnChangeEmail = (e) => {
    setEmailInput(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPasswordInput(e.target.value);
  };
  const handleOnClickConnexion = (e) => {
    e.stopPropagation();
    const userFound = users.filter(
      (user) => user.email.toLowerCase() === emailInput.toLowerCase()
    );
    if (userFound.length > 0 && userFound[0].password === passwordInput) {
      setUser(userFound[0]);
      setEmailInput("");
      setPasswordInput("");
      setShowConnexion(false);
    } else setUser(false);
  };
  const handleOnClickDeconnexion = (e) => {
    e.stopPropagation();
    setUser(null);
    setProduitsFavoris([]);
  };
  return (
    <div className={`${styles.header} d-flex flex-row align-items-center`}>
      <Logo logo={logo} />
      <User user={user} handleDeconnexion={handleOnClickDeconnexion} />
      <ul>
        {user && (   //partie pour verifier si le user est connecte 
          <li>
            <NavLink
              className="hover_opacity ajouter_produits mr-10"
              to="/admin/add"
            >
              <i className="fa-solid fa-plus mr-5"></i> Produits
            </NavLink>
          </li>
        )}
        <li>
          <span className={styles.produitsFavoris}>
            {produitsFavorisContext.data.length}
          </span>
          <i
            onClick={() => {
              setShowMenu(true);
              setShowConnexion(false);
            }}
            className="fa-solid fa-bag-shopping fa-xl panier hover_opacity"
          ></i>
        </li>
        <li className="mr-15">
          <i
            onClick={() => {
              setShowMenu(false);
              setShowConnexion(true);
            }}
            className="fa-solid fa-user fa-xl connexion hover_opacity"
          ></i>
        </li>
      </ul>

      {showMenu && (
        <>
          <div onClick={() => setShowMenu(false)} className="calc"></div>
          <HeaderMenu />
        </>
      )}
      {showConnexion && (
        <>
          <div onClick={() => setShowConnexion(false)} className="calc"></div>
          <Connexion
            handleEmail={handleOnChangeEmail}
            handlePassword={handleOnChangePassword}
            handleDeconnexion={handleOnClickDeconnexion}
            handleConnexion={handleOnClickConnexion}
            email={emailInput}
            password={passwordInput}
            user={user}
          />
        </>
      )}
    </div>
  );
};

export default Header;
