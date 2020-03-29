<template>
    <div class="profile-container">
            <header>
                <img src="../../assets/logo.svg" alt="Be The Hero"/>
                <span>Bem vinda, {{ ongName }}</span>

                <router-link class="button" to="/incidents/new">
                    Cadastrar novo caso
                </router-link>
                <button @click="$router.push('/account')" type="button">
                    <settings-icon size="18" class="red-hero"></settings-icon>
                </button>
                <button type="button" @click="handleLogout">
                    <power-icon size="18" class="red-hero"></power-icon>
                </button>
            </header>

            <div v-show="updateAlert" class="confirmUpdate">
                Sua conta foi atualizada com sucesso.
            </div>

            <h1>Casos cadastrados</h1>

            <div v-if="incidents.length > 0">
                <ul>
                    <li v-for="incident in incidents" v-bind:key="incident.id">
                        <span class="caso-titulo">Caso:</span>
                        <p>{{ incident.title }}</p>

                        <span class="caso-titulo">Descrição</span>
                        <p>{{ incident.description }}</p>

                        <span class="caso-titulo">Valor:</span>
                        <p>{{ incident.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</p>
                        <button 
                            type="button"
                            @click="handleEditIncident(incident)"
                            style="right: 60px"
                        >
                            <edit-icon size="20" class="gray-hero"></edit-icon>
                        </button>
                        <button 
                            type="button"
                            @click="handleDeleteIncident(incident.id)"
                        >
                            <trash-2-icon size="20" class="gray-hero"></trash-2-icon>
                        </button>
                    </li>
                </ul>
                <div v-if="total > 0 && incidents.length + 1 < total" class="align-center">
                    <button
                    type="button"
                    class="button"
                    @click="loadIncidents"
                    >
                        Carregar mais
                    </button>
                </div>
            </div>
            <p v-else>Ainda não há casos a serem exibidos.</p>
        </div>
</template>

<script>
import { Trash2Icon, EditIcon, PowerIcon, SettingsIcon } from 'vue-feather-icons'

import { mapState } from 'vuex'

export default {
    name: 'Profile',
    components: {
        Trash2Icon, EditIcon, PowerIcon, SettingsIcon
    },
    data() {
        return {
            loading: false,
            total: 0,
            incidents: [],
            updateAlert: false,
        }
    },
    mounted() {
        if (this.$route.params.updated === true) {
            this.updateAlert = true
        }

        // pega quando o cookie expira
        const expire = localStorage.getItem('expire_at')
        // agora
        const now = new Date()
        // diferença entre as datas
        const milliseconds = Math.abs(now - expire)
        // qnts horas faltam
        const hours = milliseconds / 36e5
        
        // se faltar 1 hr para vencer o cookie atualiza
        if (hours > 0 && hours < 1) {
            this.axios.put('sessions')
            .then((response) => {
                this.$store.commit('SET_ONG_NAME', response.data.name)
            })
        }

        this.loadIncidents()
    },
    methods: {
        async loadIncidents() {
            // se já tiver carregando mais incidents
            if(this.loading) {
                // retorne e não faça nada
                return;
            }
            
            // se o total de incidents for maior que 0 e o numero de incidents listados for igual ao total
            if (this.total > 0 && this.incidents.length === this.total) {
                // retorne e não faça nada
                return;
            }

            // define loading verdadeiro
            this.loading = true

            // solicita com metodo get para a rota 'profile' do backend
            const page = this.page
            
            await this.axios.get('profile', {
                // define um params no pedido get chamado page com o valor da pagina atual
                params: { page }
            })
            .then((response) => {
                // concatena(junta) os incidents atuais da lista junto com os incidents enviados pelo backend no data da resposta
                let incidents = this.incidents
    
                incidents = [...incidents, ...response.data]
    
                this.incidents = incidents
    
                // pega o total de incidents do cabeçalho da resposta
                this.total = response.headers['x-total-count']
                
                // soma 1 a pagina atual
                this.page = this.page + 1
    
                // define loading falso
                this.loading = false
            })
            .catch(() => {
                this.$store.commit('USER_LOGGED', false)
                this.$store.commit('SET_ONG_NAME', null)
                this.$store.commit('SET_EXPIRE_TIME', null)
                localStorage.clear()
                this.$toast.error('Não conseguimos carregar seus casos, faça login novamente.')
                this.$router.push('/')
            });
        },

        handleEditIncident(incident) {
            this.$router.push(
                {
                    name: 'IncidentEdit',
                    params: {
                        id: incident.id
                    }
                }
            )
        },

        async handleDeleteIncident(id) {
            if (confirm('Tem certeza que quer apagar este caso?')) {
                await this.axios.delete(`incidents/${id}`)
                .then(() => {
                    this.$toast.success('Caso apagado.')
                    this.incidents = this.incidents.filter(incident => incident.id !== id)
                })
                .catch(() => {
                    this.$toast.error('Não conseguimos apagar este caso, tente novamente.')
                })
            }
        },
        
        async handleLogout() {
            // foi feito pedido de logout
            this.$store.commit('USER_LOGGED', false)

            // deleta a sessao e seta o cookie nulo
            await this.axios.delete('sessions')
            .then(() => {
                localStorage.clear()
            })
            
            // empurra o cliente para a tela inicial
            this.$router.push('/');
        },
    },
    computed: {
        ...mapState([
            'ongName'
        ])
    },
}
</script>

<style scoped>
.profile-container {
    width: 100%;
    max-width: 1180px;
    padding: 0 30px;
    margin: 32px auto;
}

.profile-container header {
    display: flex;
    align-items: center;
}

.profile-container header span {
    font-size: 20px;
    margin-left: 24px;
}

.profile-container header img {
    height: 64px;
}

.profile-container header a {
    width: 260px;
    margin-left: auto;
    margin-top: 0;
}

.profile-container header button {
    height: 60px;
    width: 60px;
    border-radius: 4px;
    border: 1px solid #dcdce6;
    background: transparent;
    margin-left: 16px;
    transition: border-color 0.2s;
}

.profile-container header button:hover {
    border-color: #999;
}

.profile-container header span span {
    background: #fff;
    padding: 5px 15px;
    font-size: 11px;
    border-radius: 8px;
}

.profile-container h1 {
    margin-top: 80px;
    margin-bottom: 24px;
}

.profile-container ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 24px;
    list-style: none;
}

.profile-container ul li {
    background: #fff;
    padding: 24px;
    border-radius: 8px;
    position: relative;
}

.profile-container ul li button {
    position: absolute;
    right: 24px;
    top: 24px;
    border: 0;
    background: transparent;
    transition: opacity 0.2s;
}

.profile-container ul li button:hover {
    opacity: 0.8;
}

.profile-container ul li .caso-titulo {
    font-weight: 700;
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
    color: #41414d;
}

.profile-container ul li p + .caso-titulo {
    margin-top: 32px;
}

.profile-container ul li p {
    color: #737380;
    line-height: 21px;
    font-size: 16px;
}

.profile-container .confirmUpdate {
    margin-top: 65px;
    text-align: center;
    padding: 20px;
    background: #bcf8d7;
    color: #019141;
    border: 1px solid #019141;
    border-radius: 8px;
}
</style>