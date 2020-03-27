import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// carrega o icone LogIn do feather icon
import { FiLogIn } from "react-icons/fi";

// carrega a api
import api from '../../services/api';

// importa o styles local
import './styles.css';

// carrega o logo da pasta assets
import logoImg from "../../assets/logo.svg";
// carrega o heroes img da pasta assets
import heroesImg from "../../assets/heroes.png";

export default function Logon() {

  // define o state key
  const [key, setKey] = useState("");
  
  // define o state
  const [deleteAlert, setShowDeleteAlert] = useState(false);
  
  // instancia o history
  const history = useHistory();

  // pega a ongKey do localstorage
  const ongKey = localStorage.getItem('ongKey');
  
  // Se houver uma ongKEY salva no localStorage
  if (ongKey) {
    // envia o usuário para tela de profile
    history.push('/profile');
  }

  // define a função handleLogin
  async function handleLogin(e) {
    // previne o funcionamento normal do envio do formulário
    e.preventDefault();

    // bloco de declaração try, se funcionar:
    try {
      const response = await api.post('sessions', { key })

      // guarda no localStorage a ongKey
      localStorage.setItem('ongKey', key);
      // guarda no localStorage a ongName
      localStorage.setItem('ongName', response.data);

      // direciona para página profile
      history.push('/profile');
    
    // se der erro
    } catch (error) {
      // exibe alerta no navegador
      alert('Falha no login, tente novamente');
    }
  }

  // utiliza o useEffect para carregar uma vez toda vez que for carregada a página
  useEffect(() => {
    // verifica se na rota atual ha um state definido chamado deleted
    if (history.location.state && history.location.state.deleted) {
      // mostra o alerta
      setShowDeleteAlert(true);
    }
  }, [deleteAlert, history]);

  // exibir jsx
  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handleLogin}>
          <h1> Faça seu logon </h1>
          <input
            value={key}
            onChange={e => setKey(e.target.value)}
            required
            placeholder='Sua KEY'
          />
          <button className='button' type='submit'>
            Entrar
          </button>
      {(deleteAlert ?
          <div className="confirmDelete">
              Sua conta foi apagada, é uma pena que decidiu sair, crie uma conta nova quando quiser voltar, estaremos lhe esperando.
          </div>
      :
          ''
      )}
          <Link to='/register' className='svg-link'>
            <FiLogIn size={16} color='#E02041' />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt='Heroes' />
    </div>
  );
}
