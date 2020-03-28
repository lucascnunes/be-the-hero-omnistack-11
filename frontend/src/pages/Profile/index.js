import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

// carrega o icone da Power e o trash2 do pacote feather icons
import { FiPower, FiEdit, FiTrash2, FiSettings } from 'react-icons/fi';

// carrega a api
import api from '../../services/api';

// importa o styles local
import './styles.css';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.svg';

export default function Profile() {

    // instancia o history
    const history = useHistory();

    // pega a ongKey do localstorage
    const token = localStorage.getItem("ongToken");

    if (!token) {
        history.push('/');
    }

    // define os states
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [updateAlert, setShowUpdateAlert] = useState(false);

    // define a função loadIncidents
    async function loadIncidents() {
        // se já tiver carregando mais incidents
        if(loading) {
            // retorne e não faça nada
            return;
        }
        
        // se o total de incidents for maior que 0 e o numero de incidents listados for igual ao total
        if (total > 0 && incidents.length === total) {
            // retorne e não faça nada
            return;
        }

        // define loading verdadeiro
        setLoading(true);

        // solicita com metodo get para a rota 'profile' do backend
        const response = await api.get('profile', {
            headers: {
                // envia a ongKey para o backend pelo cabeçalho da requisição
                'Authorization': 'Bearer ' + token
            },
            // define um params no pedido get chamado page com o valor da pagina atual
            params: { page }
        });

        // concatena(junta) os incidents atuais da lista junto com os incidents enviados pelo backend no data da resposta
        setIncidents([...incidents, ...response.data]);

        // pega o total de incidents do cabeçalho da resposta
        setTotal(response.headers['x-total-count']);
        
        // soma 1 a pagina atual
        setPage(page+1);
        // define loading falso
        setLoading(false);
    
    }
    
    let showUpdatedAlert = false;

    if (history.location.state && history.location.state.updated) {
        showUpdatedAlert = true;
    } else {
        showUpdatedAlert = false;
    }

    // utiliza o useEffect para carregar uma vez toda vez que for carregada a página ou se o ongKey mudar
    useEffect(() => {
        if (showUpdatedAlert) {
            setShowUpdateAlert(true);
        }
        // faz um pedido GET para a rota do backend 'profile'
        api.get('profile', {
            headers: {
                // envia a ongKey para o backend pelo cabeçalho da requisição
                'Authorization': 'Bearer ' + token
            }
            // se tiver uma resposta
        }).then(response => {
            // define os incidents com o data da resposta
            setIncidents(response.data);
            // define o total tirando do cabeçalho da resposta o x-total-count
            setTotal(response.headers['x-total-count']);
            // carrega a primeira pagina e já coloca a segunda
            setPage(2);
        });
    }, [token, showUpdatedAlert]);

    // define a função handleDeleteIncident
    async function handleDeleteIncident(id) {
        // bloco de declaração try, se funcionar:
        try {
            // envia como metodo delete para a rota 'incidents/:id' do backend com o id passado a função handleDeleteIncident
            await api.delete(`/incidents/${id}`, {
              headers: {
                // envia a ongKey para o backend pelo cabeçalho da requisição
                  'Authorization': 'Bearer ' + token
              }  
            });
            // filtra e remove dos incidents o incident que tiver o mesmo id do incident apagado
            setIncidents(incidents.filter(incident => incident.id !== id));

        // se der erro
        } catch (error) {
            // envia alerta de erro ao navegador
            alert('Erro ao deletar o caso, tente novamente.');
        }
    }

    function handleEditIncident(incident) {
        history.push('/incidents', {
            id: incident.id
        });
    }

    // define a função handleLogout
    function handleLogout() {
        // apaga todo o localStorage do navegador
        localStorage.clear();
        // empurra o cliente para a tela inicial
        history.push('/');
    }

    // exibe o jsx abaixo
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vinda, {localStorage.getItem('ongName')}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>
                <button onClick={() => history.push('/account')} type="button">
                    <FiSettings size={18} color="#E02041" />
                </button>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            {(updateAlert ?
                <div className="confirmUpdate">
                    Sua conta foi atualizada com sucesso.
                </div>
            :
                ''
            )}

            <h1>Casos cadastrados</h1>

            {
            // o numero de incidents é maior que 0 ?
            (incidents.length > 0 ? // se sim exiba o jsx abaixo
                    <div>
                        <ul>
                            {
                            // faz um loop exibindo todos os 'incident' dentro da lista 'incidents'
                            incidents.map(incident => (
                                <li key={incident.id}>
                                    <span className="caso-titulo">Caso:</span>
                                    <p>{incident.title}</p>

                                    <span className="caso-titulo">Descrição</span>
                                    <p>{incident.description}</p>

                                    <span className="caso-titulo">Valor:</span>
                                    <p>{incident.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                    <button 
                                        type="button"
                                        // emite um alerta(confirm) e chama a função handleDeleteIncident passando o id do incident caso o usuário confirme
                                        onClick={() => handleEditIncident(incident)}
                                        style={{
                                            right: 60
                                        }}
                                    >
                                        <FiEdit size={20} color="#a8a8b3" />
                                    </button>
                                    <button 
                                        type="button"
                                        // emite um alerta(confirm) e chama a função handleDeleteIncident passando o id do incident caso o usuário confirme
                                        onClick={(e) => { if (window.confirm('Tem certeza que quer apagar este caso?')) handleDeleteIncident(incident.id) }}
                                    >
                                        <FiTrash2 size={20} color="#a8a8b3" />
                                    </button>
                                </li>
                            ))}
                        </ul>
                        {
                        // o total de incidents é maior que 0 e o numero de incidents exibidos é menor que o total ?
                        (total > 0 && incidents.length + 1 < total) ? // se sim mostre o jsx abaixo
                            <div className="align-center">
                                <button
                                type="button"
                                className="button"
                                // chama a função loadIncidents para carregar mais incidents
                                onClick={loadIncidents}
                                >
                                    Carregar mais
                                </button>
                            </div>
                        : // senão não mostre nada
                            ''
                        }
                    </div>
                :  // senão mostre a mensagem abaixo
                <p>Ainda não há casos a serem exibidos.</p>
            )}
            
        </div>
    );
}