<template>
    <div class="edit-incident-container">
            <div class="content">
                <section>
                    <img src="../../assets/logo.svg" alt="Be The Hero"/>
                    <h1>Editando caso</h1>
                    <p>
                        Altere as informações do caso.
                    </p>

                    <router-link to="/profile" class="svg-link">
                        <arrow-left-icon size="16" class="red-hero"></arrow-left-icon>
                        Voltar para o perfil
                    </router-link>
                </section>
                <form 
                    id="edit-incident"
                    v-on:submit.prevent="handleUpdateIncident"
                >
                    <input 
                        type="text"
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
                        required
                    />
                    <div class="button-group">
                        <button :disabled="sending" class="button" type="submit">
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
    name: 'EditIncident',
    components: {
        ArrowLeftIcon
    },
    data() {
        return {
            sending: false,
            title: '',
            description: '',
            value: '',
        }
    },
    mounted() {
        const id = this.$route.params.id
        if (!id) {
            this.$toast.error('Não conseguimos carregar este caso, tente novamente.')
            this.$router.push('/profile')
        }

        this.axios.get(`incidents/${id}`)
        // se tiver uma resposta
        .then(response => {
            // define os incidents com o data da resposta
            this.title = response.data.title
            this.description = response.data.description
            this.value = response.data.value
        })
        .catch(() => {
            this.$toast.error('Não conseguimos carregar este caso, tente novamente.')
            this.$router.push('/profile')
        })
    },
    methods: {
        async handleUpdateIncident() {
            const id = this.$route.params.id
            
            this.sending = true

            const title = this.title
            const description = this.description
            const value = this.value

            await this.axios.put(`incidents/${id}`, {
                title,
                description,
                value
            })
            .then(() => {
                this.$toast.success('Caso atualizado.')
                this.$router.push({
                    name: 'Profile',
                })
            })
            .catch(() => {
                this.sending = false
                this.$toast.error('Não conseguimos atualizar este caso, tente novamente.')
            })
        }
    },
}
</script>

<style scoped>
.edit-incident-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.edit-incident-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.edit-incident-container .content section {
    width: 100%;
    max-width: 380px;
}

.edit-incident-container .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
}

.edit-incident-container .content section p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;;
}

.edit-incident-container .content form {
    width: 100%;
    max-width: 450px;
}

.edit-incident-container .content form input,
.edit-incident-container .content form textarea {
    margin-top: 8px;
}

.edit-incident-container .content form .button-group {
    display: flex;
    justify-content: space-between;
}

.edit-incident-container .content form .button-group button + button {
    margin-left: 8px;
}

.edit-incident-container .content form .button-group .cancelar {
    width: 60%;
    background: transparent;
    border: 2px solid #2020226b;
    color: rgba(0, 0, 0, 0.884);
    transition: opacity 0.2s;
}

.edit-incident-container .content form .button-group .cancelar:hover {
    opacity: 0.8;
}
</style>