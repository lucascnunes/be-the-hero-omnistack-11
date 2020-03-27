import React, { useState, useRef, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

// carrega o icone da seta para esquerda do pacote feather icons
import { FiArrowLeft } from "react-icons/fi";

// carrega a api
import api from '../../services/api';

// importa o styles local
import "./styles.css";

// carrega o logo da pasta assets
import logoImg from "../../assets/logo.svg";

export default function Account() {
  
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  // instancia o btnSave como uma referencia
  const btnSave = useRef();

  // instancia o btnDelete como uma referencia
  const btnDelete = useRef();

  // utiliza o useEffect para carregar uma vez toda vez que for carregada a página ou se o ongKey mudar
  useEffect(() => {
    // faz um pedido GET para a rota do backend 'profile'
    api.get('account', {
        headers: {
            // envia a ongKey para o backend pelo cabeçalho da requisição
            'Authorization': ongKey
        }
        // se tiver uma resposta
    }).then(response => {
        // define os incidents com o data da resposta
        setName(response.data.name);
        setEmail(response.data.email);
        setWhatsapp(response.data.whatsapp);
        setCity(response.data.city);
        setUf(response.data.uf);
    });
  }, [ongKey]);

  // define a função handleUpdate
  async function handleUpdate(e) {
    // previne o funcionamento normal do envio do formulário
    e.preventDefault();

    // Desabilita o botao para que não seja enviado o formulário mais de uma vez
    btnSave.current.setAttribute('disabled', true);

    // armazena os states dentro da variavel data
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    // bloco de declaração try, se funcionar:
    try {
      // envia os states atualizados com metodo put para a rota 'account' do backend
      const response = await api.put('account', data, {
        headers: {
          // envia a ongKey para o backend pelo cabeçalho da requisição
          'Authorization': ongKey,
        }
      });

      // atualiza a variavel ongName no localStorage
      localStorage.setItem('ongName', response.data);
      
      // redireciona para o 'profile'
      history.push('/profile', {
        // com state 'updated: true'
        updated: true,
      });

    // se der erro
    } catch (error) {
      // libera o uso do botão novamente
      btnSave.current.removeAttribute('disabled');
      // envia alerta de erro ao navegador
      alert('Não conseguimos atualizar suas informações, tente novamente.');
    }
  }

  // define a função handleDeleteAccount
  async function handleDeleteAccount(e) {
    // previne o funcionamento normal do envio do formulário
    e.preventDefault();

    // Desabilita o botao para que não seja enviado o pedido mais de uma vez
    btnDelete.current.setAttribute('disabled', true);

    // bloco de declaração try, se funcionar:
    try {
      // envia metodo delete para a rota 'ongs' do backend
      const response = await api.delete('ongs', {
        headers: {
          // envia a ongKey para o backend pelo cabeçalho da requisição
          'Authorization': ongKey,
        }
      });

      // apaga todo o localStorage do navegador
      localStorage.clear();

      // redireciona para o 'profile'
      history.push('/', {
        // com state 'deleted: true'
        deleted: true,
      });

    // se der erro
    } catch (error) {
      // libera o uso do botão novamente
      btnDelete.current.removeAttribute('disabled');
      // envia alerta de erro ao navegador
      alert('Não conseguimos atualizar suas informações, tente novamente.');
    }

  }
  
  // exibe o jsx
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1> Conta </h1> <p>Atualize as informações de sua ONG ou apague sua conta de nossa aplicação.</p>
          <Link to="/profile" className="svg-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o perfil
          </Link>
        </section>
        <form onSubmit={handleUpdate}>
          <input
            placeholder="Nome da ONG"
            value={name}
            required
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email} 
            required
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="tel" 
            placeholder="Whatsapp"
            value={whatsapp} 
            required
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={city}
              required
              onChange={e => setCity(e.target.value)}
            />
            <input
              value={uf}
              placeholder="UF"
              onChange={e => setUf(e.target.value)}
              required
              style={{
                  width: 80
                }}
            />
          </div>
          <div className="button-group">
              <button 
                className="button cancelar"
                type="button"
                ref={btnDelete}
                // emite um alerta(confirm) e chama a função handleDeleteIncident passando o id do incident caso o usuário confirme
                onClick={(e) => { if (window.confirm('Tem certeza que quer apagar sua conta?')) handleDeleteAccount(e) } }
              >
                  Apagar conta
              </button>
              <button ref={btnSave} className="button" type="submit">
                  Atualizar
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}
