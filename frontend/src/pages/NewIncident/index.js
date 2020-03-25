import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

    const history = useHistory();

    const ongKey = localStorage.getItem("ongKey");
    if (!ongKey) {
        history.push('/');
    }

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    'Authorization': ongKey
                }
            });
            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>
                        Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                    </p>

                    <Link to="/profile" className="svg-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o perfil
                    </Link>
                </section>
                <form 
                    id="new-incident"
                    onSubmit={handleNewIncident}
                >
                    <input 
                        placeholder="Título do caso"
                        value={title}
                        required
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        required
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="tel" 
                        placeholder="Valor em reais"
                        value={value}
                        required
                        onChange={e => setValue(e.target.value)}
                    />
                    <div className="button-group">
                        <button className="button cancelar" type="button" onClick={() => {
                            document.getElementById("new-incident").reset()
                        }}>
                            Limpar
                        </button>
                        <button className="button" type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}