import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// carrega o icone da seta para esquerda do pacote feather icons
import { FiArrowLeft } from 'react-icons/fi';

// carrega a api
import api from '../../services/api';

// importa o styles local
import './styles.css';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.svg';

export default function EditIncident() {

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

    // instancia o btnAtualizar como uma referencia
    const btnAtualizar = useRef();

    // se houver o state id na rota do history
    let id = 0;
    if (history.location.state && history.location.state.id) {
        id = history.location.state.id;
    } else {
        history.push('/profile');
    }

    useEffect(() => {
        // faz um pedido GET para a rota do backend 'profile'
        api.get(`incidents/${id}`, {
            headers: {
                // envia a ongKey para o backend pelo cabeçalho da requisição
                'Authorization': ongKey
            }
        })
        // se tiver uma resposta
        .then(response => {
            // define os incidents com o data da resposta
            setTitle(response.data.title);
            setDescription(response.data.description);
            setValue(response.data.value);
        });
    }, [ongKey, id]);
    
    // define a função handleUpdateIncident
    async function handleUpdateIncident(e) {
        // previne o funcionamento normal do envio do formulário
        e.preventDefault();

        // Desabilita o botao para que não seja enviado o formulário mais de uma vez
        btnAtualizar.current.setAttribute('disabled', true);

        // armazena o title, description, value dentro da variavel data
        const data = {
            title,
            description,
            value,
        };

        // bloco de declaração try, se funcionar:
        try {
            // envia os dados do formulário como metodo post para a rota 'incidents' do backend
            await api.put(`incidents/${id}`, data, {
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
            btnAtualizar.current.removeAttribute('disabled');
            // envia alerta de erro ao navegador
            alert('Erro ao atualizar o caso, tente novamente.');
        }
    }

    // imprime o jsx
    return (
        <div className="edit-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Editando caso</h1>
                    <p>
                        Altere as informações do caso.
                    </p>

                    <Link to="/profile" className="svg-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o perfil
                    </Link>
                </section>
                <form 
                    id="edit-incident"
                    onSubmit={handleUpdateIncident}
                >
                    <input 
                        type="text"
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
                        <button ref={btnAtualizar} className="button" type="submit">
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}