<template>
    <div class="new-incident-container">
        <div class="content">
            <section>
                <img src="../../assets/logo.svg" alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>
                <p>
                    Descreva o caso detalhadamente para encontrar um herói para resolver isso.
                </p>

                <router-link to="/profile" class="svg-link">
                    <arrow-left-icon size="16" class="red-hero"></arrow-left-icon>
                    Voltar para o perfil
                </router-link>
            </section>
            <form 
                ref="new_incident"
                v-on:submit.prevent="handleNewIncident"
            >
                <input 
                    placeholder="Título do caso"
                    v-model="title"
                    required
                />
                <textarea 
                    placeholder="Descrição"
                    v-model="description"
                    required
                />
                <input 
                    type="number" 
                    placeholder="Valor em reais"
                    v-model="value"
                    min="0"
                    required
                />
                <div class="button-group">
                    <button class="button cancelar" type="button" @click="$refs.new_incident.reset()">
                        Limpar
                    </button>
                    <button :disabled="sending" class="button" type="submit">
                        Cadastrar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { ArrowLeftIcon } from 'vue-feather-icons'

export default {
    name: 'NewIncident',
    components: {
        ArrowLeftIcon
    },
    data() {
        return {
            title: '',
            description: '',
            value: '',
            sending: false,

        }
    },
    methods: {
        async handleNewIncident() {
            this.sending = true
            
            const title = this.title
            const description = this.description
            const value = this.value

            await this.axios.post('incidents', { title, description, value })
            .then(() => {
                this.$toast.success('Novo caso adicionado.')
                this.$router.push('/profile')
            })
            .catch(() => {
                this.sending = false
                this.$toast.error('Não conseguimos adicionar o novo caso, tente novamente')
            })
        }
    },
}
</script>


<style scoped>
.new-incident-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.new-incident-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.new-incident-container .content section {
    width: 100%;
    max-width: 380px;
}

.new-incident-container .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
}

.new-incident-container .content section p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;;
}

.new-incident-container .content form {
    width: 100%;
    max-width: 450px;
}

.new-incident-container .content form input,
.new-incident-container .content form textarea {
    margin-top: 8px;
}

.new-incident-container .content form .button-group {
    display: flex;
    justify-content: space-between;
}

.new-incident-container .content form .button-group button + button {
    margin-left: 8px;
}

.new-incident-container .content form .button-group .cancelar {
    width: 60%;
    background: transparent;
    border: 2px solid #2020226b;
    color: rgba(0, 0, 0, 0.884);
    transition: opacity 0.2s;
}

.new-incident-container .content form .button-group .cancelar:hover {
    opacity: 0.8;
}
</style>