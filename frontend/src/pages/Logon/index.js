import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from '../../services/api';

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

export default function Logon() {

  const [key, setKey] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { key })

      localStorage.setItem('ongKey', key);
      localStorage.setItem('ongName', response.data);

      history.push('/profile');
    } catch (error) {
      console.log('Falha no login');
    }
  }

  return (
    <div className='logon-container'>
      <section className='form'>
        <img src={logoImg} alt='Be The Hero' />
        <form onSubmit={handleLogin}>
          <h1> Faça seu logon </h1>
          <input
            value={key}
            onChange={e => setKey(e.target.value)}
            placeholder='Sua KEY'
          />
          <button className='button' type='submit'>
            Entrar
          </button>
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
