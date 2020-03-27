import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

// carrega o icone da seta para esquerda do pacote feather icons
import { FiArrowLeft } from "react-icons/fi";

// carrega a página RegisterSuccess
import RegisterSuccess from '../RegisterSuccess';

// carrega a api
import api from '../../services/api';

// importa o styles local
import './styles.css';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.svg';

export default function Register() {
  // define um state para ver se o registro obteve sucesso ou não
  const [successRegistration, setSuccessRegistration] = useState(false);

  // define os states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [ong_key, setOngKey] = useState("");

  // instancia o btnRegister como uma referencia
  const btnRegister = useRef();
 
  // define a função handleRegister
  async function handleRegister(e) {
    // previne o funcionamento normal do envio do formulário
    e.preventDefault();

    // Desabilita o botao para que não seja enviado o formulário mais de uma vez
    btnRegister.current.setAttribute('disabled', true);

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
      // envia os dados do formulário como metodo post para a rota 'ongs' do backend
      const response = await api.post('ongs', data);
      // define o state ongsKey com a KEY vinda da resposta do api.post acima
      setOngKey(response.data.key);
      // define o state successRegistration como verdadeiro
      setSuccessRegistration(true);

    // se der erro
    } catch (error) {
      // libera o uso do botão novamente
      btnRegister.current.removeAttribute('disabled');
      // define o state successRegistration como falso
      setSuccessRegistration(false);
      // envia alerta de erro ao navegador
      alert('Não foi possível fazer seu cadastro.');
    }
  }

  // se o registro foi um sucesso
  if (successRegistration) {
    // exibe este jsx com a página RegisterSuccess com um children da ong_key
    return (
      <RegisterSuccess>
        {ong_key}
      </RegisterSuccess>
    );
    
  // se não tiver feito ainda o registro ou não foi um sucesso exiba ou mantenha este jsx
  } else {
    return (
      <div className="register-container">
        <div className="content">
          <section>
            <img src={logoImg} alt="Be The Hero" />
            <h1> Cadastro </h1> <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG. </p>
            <Link to="/" className="svg-link">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar para o logon
            </Link>
          </section>
          <form onSubmit={handleRegister}>
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
            <button ref={btnRegister} className="button" type="submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}
