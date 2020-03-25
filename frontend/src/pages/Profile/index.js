import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const history = useHistory();

    const ongKey = localStorage.getItem("ongKey");

    if (!ongKey) {
        history.push('/');
    }
    
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                'Authorization': ongKey
            }
        })
        .then(response => {
            setIncidents(response.data);
        })
    }, [ongKey]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`/incidents/${id}`, {
              headers: {
                  'Authorization': ongKey
              }  
            });

            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {localStorage.getItem('ongName')} <span className="key">KEY: <strong>{ongKey}</strong></span></span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <span className="caso-titulo">Caso:</span>
                        <p>{incident.title}</p>

                        <span className="caso-titulo">Descrição</span>
                        <p>{incident.description}</p>

                        <span className="caso-titulo">Valor:</span>
                        <p>{incident.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

                        <button 
                            type="button"
                            onClick={() => handleDeleteIncident(incident.id)}
                        >
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}