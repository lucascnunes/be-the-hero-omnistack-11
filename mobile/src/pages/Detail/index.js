import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View, Text, Image, TouchableOpacity, Linking } from 'react-native';

// carrega tudo do pacote expo-mail-composer como MailComposer
import * as MailComposer from 'expo-mail-composer';

// carrega o feather icons
import { Feather } from '@expo/vector-icons';

// importa o styles local
import styles from './styles';

// carrega o logo da pasta assets
import logoImg from '../../assets/logo.png';

export default function Incidents() {
    // define route com as informações da rota
    const route = useRoute();

    // define o incident com os parametros da rota chamado incident
    const incident = route.params.incident;

    // instancia o navigation
    const navigation = useNavigation();

    // define a mensagem a ser enviada pelo email e whatsapp
    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}`;

    // define a função navigateBack()
    function navigateBack() {
        // executa o navigation função goBack() para retornar a tela anterior
        navigation.goBack();
    }

    // define a função sendMail para enviar um email
    function sendMail() {
        // chama o composeAsync do MailComposer para enviar um e-mail
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['hero@bethehero.com.br'],
            body: message,
        });
    }

    // define a função sendWhatsapp para abrir o aplicativo dentro do celular
    function sendWhatsapp() {
        // utiliza o Linking para abrir o aplicativo passando os parametros de phone e text com o numero do whatsapp da ong do incident e da mensagem
        Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
    }
    
    // exibe o jsx abaixo
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={navigateBack}
                >
                    <Feather name="arrow-left" size={28}  color="#E82041"/>
                </TouchableOpacity>
                <Image source={logoImg} />
            </View>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.incident}>
                    <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
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
                    <View style={styles.groupIncidentProperties}>
                        <View style={styles.groupIncidentPropertiesItem}>
                            <Text style={styles.incidentProperty}>
                                CIDADE:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {incident.city}
                            </Text>
                        </View>
                        <View style={styles.groupIncidentPropertiesItem}>
                            <Text style={styles.incidentProperty}>
                                ESTADO:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {incident.uf}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={styles.contactBox}>
                    <Text style={styles.heroTitle}>Salve o dia!</Text>
                    <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={styles.heroDescription}>Entre em contato:</Text>

                    <View style={styles.actions}>
                        <TouchableOpacity 
                            style={styles.action}
                            onPress={sendWhatsapp}
                        >
                            <Text style={styles.actionText}>
                                WhatsApp
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.action}
                            onPress={sendMail}
                        >
                            <Text style={styles.actionText}>
                                Email
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}