import React from "react";
import { useHistory } from "react-router-dom";

import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function RegisterSuccess({ children }) {
  
  const history = useHistory();

  return (
    <div className="register-success-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Cadastro realizado com sucesso! </h1>
          <p>Abaixo está a sua chave de acesso: </p>
          <h1 style={{
              background: "#fff",
              padding: 20,
              textAlign: "center"
            }}
          >
            {children}
          </h1>
          <button 
            className="button"
            // Utilizando history push somente para aprender
            onClick={() => history.push('/')}
          >
            Fazer logon
          </button>
        </section>
      </div>
    </div>
  );
}
