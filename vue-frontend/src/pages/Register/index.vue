<template>
    <div>
        <div v-if="success" class="register-success-container">
            <div class="content">
                <section>
                    <img src="../../assets/logo.svg" alt="Be The Hero"/>
                    <h1> Cadastro realizado com sucesso! </h1>
                    <p>Seja bem vindo ao Be The Hero!! Confira seu e-mail enviamos uma confirmação:</p>
                    <a 
                        rel="noopener noreferrer"
                        target="_blank" 
                        :href="'http://'+email.split('@')[1]" 
                        style='
                        background: #fff;
                        padding: 20px;
                        text-align: center;
                        display: block;
                        margin: 10px;
                        font-size: 30px;
                        color: #1e1e1f;
                        text-decoration: none;
                        font-weight: bold;
                        '
                    >
                        Abrir o {{ email.split('@')[1].split('.')[0].charAt(0).toUpperCase() + email.split('@')[1].slice(1) }}
                    </a>
                    <button 
                        class="button"
                        @click="$router.push('/profile')"
                    >
                        Ver seu perfil
                    </button>
                </section>
            </div>
        </div>
        <div v-else class="register-container">
            <div class="content">
                <section>
                    <img src="../../assets/logo.svg" alt="Be The Hero"/>
                    <h1> Cadastro </h1> <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG. </p>
                    <router-link to="/" class="svg-link">
                        <arrow-left-icon size="1.5x" class="red-hero"></arrow-left-icon>
                        Voltar para o logon
                    </router-link>
                </section>
                <form autocomplete="off" v-on:submit.prevent="handleRegister">
                    <input
                    autocomplete="off"
                    placeholder="Nome da ONG"
                    v-model="name"
                    required
                    />
                    <input 
                    type="email" 
                    autocomplete="off"
                    placeholder="E-mail" 
                    v-model="email"
                    required
                    />
                    <input 
                    type="tel" 
                    autocomplete="off"
                    placeholder="Whatsapp"
                    v-model="whatsapp"
                    required
                    minLength="10"
                    maxLength="11"
                    />
                    <div class="input-group">
                        <input 
                            autocomplete="off"
                            placeholder="Cidade" 
                            v-model="city"
                            required
                            style="
                                text-transform: capitalize;
                            "
                        />
                        <input
                            v-model="uf"
                            autocomplete="off"
                            placeholder="UF"
                            required
                            maxLength={2}
                            style="
                                width: 80px;
                                text-transform: uppercase;
                            "
                        />
                    </div>
                    <input
                        type="password"
                        v-model="password"
                        required
                        autocomplete="off"
                        placeholder='Sua senha'
                />
                    <button :disabled="sending" class="button" type="submit">
                    Cadastrar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { ArrowLeftIcon } from 'vue-feather-icons'
export default {
    name: 'Register',
    components: {
        ArrowLeftIcon
    },
    data() {
        return {
            success: false,
            sending: false,
            name: '',
            email: '',
            whatsapp: '',
            city: '',
            uf: '',
            password: '',
        }
    },
    methods: {
        async handleRegister() {
            this.sending = true

            const name = this.name
            const email = this.email
            const whatsapp = this.whatsapp
            const city = this.city
            const uf = this.uf
            const password = this.password
            
            await this.axios.post('ongs', {
                name,
                email,
                whatsapp,
                city,
                uf,
                password
            })
            .then((response) => {
                this.success = true
                this.$toast.success(`Bem vinda ${name}`)

                this.$store.commit('SET_ONG_NAME', response.data.name)
                this.$store.commit('SET_EXPIRE_TIME', response.data.expire_at)
                this.$store.commit('SET_EXPIRED', false)
                this.$store.commit('USER_LOGGED', true)
            })
            .catch((error) => {
                this.sending = false
                if (error.response.data.statusCode === 400) {
                    this.$toast.error(error.response.data.message)
                } else {
                    this.$toast.error(error.response.data.error)
                }
            })
        }
    },
}
</script>

<style scoped>
.register-success-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.register-success-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.register-success-container .content section {
    width: 100%;
}

.register-success-container .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
}

.register-success-container .content section p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;;
}

.register-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: center;
}

.register-container .content {
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0 ,0, 0.1);
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.register-container .content section {
    width: 100%;
    max-width: 380px;
}

.register-container .content section h1 {
    margin: 64px 0 32px;
    font-size: 32px;
}

.register-container .content section p {
    font-size: 18px;
    color: #737380;
    line-height: 32px;;
}

.register-container .content form {
    width: 100%;
    max-width: 450px;
}

.register-container .content form input {
    margin-top: 8px;
}

.register-container .content form .input-group {
    display: flex;
}

.register-container .content form .input-group input + input {
    margin-left: 8px;
}
</style>