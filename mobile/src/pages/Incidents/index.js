import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

// carrega o feather icons
import { Feather } from '@expo/vector-icons';

// carrega a api
import api from '../../services/api';

// importa o styles local
import styles from './styles';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.png';

export default function Incidents() {
    // define os states
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // instancia o navigation
    const navigation = useNavigation();

    // define a função navigateToDetail com o 'incident' alvo como parametro
    function navigateToDetail(incident) {
        // chama o navigate do useNavigate para ir para a tela Detail com as informações do incident
        navigation.navigate('Detail', { incident });
    }

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

        // solicita com metodo get para a rota 'incidents' do backend
        const response = await api.get('incidents', {
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

    // utiliza o useEffect para carregar uma vez toda vez que for carregada a página
    useEffect(() => {
        // chama a função loadIncidents()
        loadIncidents();
    }, []);

    // exibe o jsx abaixo
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.incidentList}
                // define o conteudo da lista com os 'incidents'
                data={incidents}
                // define uma chave unica para cada incident usando o ID do mesmo
                keyExtractor={incident => String(incident.id)}
                // esconde a barra vertical da lista
                showsVerticalScrollIndicator={false}
                // chama o loadIncidents caso o usuario arraste a lista para baixo tentando atualizar a lista
                onRefresh={loadIncidents}
                // passa o loading se está carregando(true) ou não(false)
                refreshing={loading}
                // ao chegar no final da lista chama a função loadIncidents para carregar mais
                onEndReached={loadIncidents}
                // define o quão próximo do final da lista deve chamar a função loadIncidents - 20% do final
                onEndReachedThreshold={0.2}
                // exibe cada 'incident' da lista 'incidents' e define o nome do item como 'incident'
                renderItem={({ item: incident }) => (
                    <View>
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>
                                ONG:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {incident.name}
                            </Text>
                            <Text style={styles.incidentProperty}>
                                CASO:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {incident.title}
                            </Text>
                            <Text style={styles.incidentProperty}>
                                VALOR:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}
                            </Text>
                            <View
                            style={{
                                borderBottomColor: '#ddd',
                                borderBottomWidth: 1,
                                marginBottom: 10,
                            }}
                            />
                            <TouchableOpacity 
                                style={styles.detailsButton} 
                                onPress={() => navigateToDetail(incident)}
                            >
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>

                                <Feather name="arrow-right" size={16} color="#E02041"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}