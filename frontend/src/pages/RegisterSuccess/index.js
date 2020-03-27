import React from "react";
import { useHistory } from "react-router-dom";

// importa o styles local
import "./styles.css";

// carrega o logo da pasta assets
import logoImg from "../../assets/logo.svg";

export default function RegisterSuccess({ children }) {
  
  // instancia o history
  const history = useHistory();

  // exibe o jsx
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
            // Utilizando history push para levar o usuario a página inicial somente para aprender
            onClick={() => history.push('/')}
          >
            Fazer logon
          </button>
        </section>
      </div>
    </div>
  );
}
