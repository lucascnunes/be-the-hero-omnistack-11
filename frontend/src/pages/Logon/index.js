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

  // define os states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // define o state
  const [deleteAlert, setShowDeleteAlert] = useState(false);
  
  // instancia o history
  const history = useHistory();

  // instancia token do localstorage
  const token = localStorage.getItem('ongToken');

  // se houver um token definido
  if(token) {
    // empurra o usuario para o profile
    history.push('/profile');
  }

  // define a função handleLogin
  async function handleLogin(e) {
    // previne o funcionamento normal do envio do formulário
    e.preventDefault();

    // bloco de declaração try, se funcionar:
    try {
      const response = await api.post('sessions', { email, password });
      
      // guarda no localStorage a token JWT
      localStorage.setItem('ongToken', response.data.token);
      // guarda no localStorage o email
      localStorage.setItem('ongEmail', email);
      // guarda no localStorage a ongName
      localStorage.setItem('ongName', response.data.name);

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
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder='Seu e-mail'
          />
          <input
            style={{ marginTop: 10 }}
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder='Sua senha'
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
