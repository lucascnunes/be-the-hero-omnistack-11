import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';

// carrega o icone da seta para esquerda do pacote feather icons
import { FiArrowLeft } from 'react-icons/fi';

// carrega a api
import api from '../../services/api';

// importa o styles local
import './styles.css';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.svg';

export default function NewIncident() {

    // instancia o history
    const history = useHistory();

    // pega a ongKey do localstorage
    const ongKey = localStorage.getItem("ongKey");

    // Se não houver uma ongKEY salva no localStorage
    if (!ongKey) {
        // envia o usuário para tela inicial
        history.push('/');
    }

    // define os states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");

    // instancia o btnRegister como uma referencia
    const btnRegister = useRef();

    // define a função handleNewIncident
    async function handleNewIncident(e) {
        // previne o funcionamento normal do envio do formulário
        e.preventDefault();

        // Desabilita o botao para que não seja enviado o formulário mais de uma vez
        btnRegister.current.setAttribute('disabled', true);

        // armazena o title, description, value dentro da variavel data
        const data = {
            title,
            description,
            value,
        };

        // bloco de declaração try, se funcionar:
        try {
            // envia os dados do formulário como metodo post para a rota 'incidents' do backend
            await api.post('incidents', data, {
                headers: {
                    // envia a ongKey para o backend pelo cabeçalho da requisição
                    'Authorization': ongKey
                }
            });
            // direciona para página profile
            history.push('/profile');

        // se der erro
        } catch (error) {
            // libera o uso do botão novamente
            btnRegister.current.removeAttribute('disabled');
            // envia alerta de erro ao navegador
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }

    // imprime o jsx
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
                        <button ref={btnRegister} className="button" type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}