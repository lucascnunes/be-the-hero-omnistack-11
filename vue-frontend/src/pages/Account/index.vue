<template>
    <div class="account-container">
        <div class="content">
            <section>
                <img src="../../assets/logo.svg" alt="Be The Hero"/>
                <h1> Conta </h1>
                <p>Atualize as informações de sua ONG ou apague sua conta de nossa aplicação.</p>

                <router-link to="/profile" class="svg-link">
                    <arrow-left-icon size="16" class="red-hero"></arrow-left-icon>
                    Voltar para o perfil
                </router-link>
            </section>
            <form v-on:submit.prevent="handleUpdate">
                <input
                    type="text"
                    placeholder="Nome da ONG"
                    v-model="name"
                    required
                />
                <input 
                    type="email" 
                    placeholder="E-mail" 
                    v-model="email"
                    required
                />
                <input 
                    type="tel" 
                    placeholder="Whatsapp"
                    v-model="whatsapp"
                    required
                    minLength="10"
                    maxLength="11"
                />
                <div class="input-group">
                    <input
                    type="text"
                    placeholder="Cidade" 
                    v-model="city"
                    required
                    style="
                        text-transform: capitalize
                    "
                    />
                    <input
                    type="text"
                    v-model="uf"
                    placeholder="UF"
                    required
                    maxLength="2"
                    style="
                        width: 80px;
                        text-transform: uppercase;
                    "
                    />
                </div>
                <div class="button-group">
                    <button 
                        class="button cancelar"
                        type="button"
                        @click="handleDeleteAccount"
                    >
                        Apagar conta
                    </button>
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
    name: 'Account',
    components: {
        ArrowLeftIcon
    },
    data() {
        return {
            sending: false,
            name: '',
            email: '',
            whatsapp: '',
            city: '',
            uf: ''
        }
    },
    mounted() {
        this.axios.get('account')
        .then((response) => {
            this.name = response.data.name
            this.email = response.data.email
            this.whatsapp = response.data.whatsapp
            this.city = response.data.city
            this.uf = response.data.uf
        })
        .catch(() => {
            this.$store.commit('USER_LOGGED', false)
            this.$store.commit('SET_ONG_NAME', null)
            this.$store.commit('SET_EXPIRE_TIME', null)
            localStorage.clear()
            this.$toast.error('Não conseguimos carregar suas informações, faça login novamente.')
            this.$router.push('/')
        })
    },
    methods: {
        async handleDeleteAccount() {
            if (confirm('Tem certeza que quer apagar sua conta?')) {
                await this.axios.delete('ongs')
                .then(() => {
                    this.$store.commit('USER_LOGGED', false)
                    this.$store.commit('SET_ONG_NAME', null)
                    this.$store.commit('SET_EXPIRE_TIME', null)
                    localStorage.clear()
                    this.$router.push({
                        name: 'Login',
                        params: {
                            deleted: true
                        }
                    })
                })
                .catch(() => {
                    this.$toast.error('Não conseguimos apagar sua conta, tente novamente')
                })
            }
        },

        async handleUpdate() {

            this.sending = true

            const name = this.name
            const email = this.email
            const whatsapp = this.whatsapp
            const city = this.city
            const uf = this.uf

            await this.axios.put('account', {
                name,
                email,
                whatsapp,
                city,
                uf
            })
            .then(() => {
                this.$router.push({
                    name: 'Profile',
                    params: {
                        updated: true
                    }
                })
            })
            .catch(() => {
                this.sending = false
                this.$toast.error('Não conseguimos atualizar sua conta, tente novamente')
            })
        }
    }
}
</script>

<style scoped>
.account-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.account-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.account-container .content section {
    width: 100%;
    max-width: 380px;
}

.account-container .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
}

.account-container .content section p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;;
}

.account-container .content form {
    width: 100%;
    max-width: 450px;
}

.account-container .content form input {
    margin-top: 8px;
}

.account-container .content form .input-group {
    display: flex;
}

.account-container .content form .input-group input + input {
    margin-left: 8px;
}
.account-container .content form .button-group {
    display: flex;
    justify-content: space-between;
}

.account-container .content form .button-group button + button {
    margin-left: 8px;
}

.account-container .content form .button-group .cancelar {
    width: 60%;
    background: transparent;
    border: 2px solid #2020226b;
    color: rgba(0, 0, 0, 0.884);
    transition: opacity 0.2s;
}

.account-container .content form .button-group .cancelar:hover {
    opacity: 0.8;
}
</style>