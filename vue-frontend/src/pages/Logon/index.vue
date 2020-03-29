<template>
    <div class='logon-container'>
      <section class='form'>
        <img src="../../assets/logo.svg" alt='Be The Hero' />
        <form autocomplete="off" v-on:submit.prevent="handleLogin">
          <h1> Faça seu logon </h1>
          <input
            type="email"
            v-model="email"
            required
            autocomplete="off"
            placeholder='Seu e-mail'
          />
          <input
            style="margin-top: 10px;"
            type="password"
            v-model="password"
            required
            autocomplete="off"
            placeholder='Sua senha'
          />
          <button class='button' type='submit'>
            Entrar
          </button>
          <div v-show="deleteAlert" class="confirmDelete">
              Sua conta foi apagada, é uma pena que decidiu sair, crie uma conta nova quando quiser voltar, estaremos lhe esperando.
          </div>
          <div v-if="expired" class="confirmDelete">
              Sua sessão expirou, faça sua autenticação novamente para continuar.
          </div>
          <router-link to='/register' class='svg-link'>
            <log-in-icon size="1.5x" class="red-hero"></log-in-icon>
            Não tenho cadastro
          </router-link>
        </form>
      </section>
      <img src="../../assets/heroes.png" alt='Heroes' />
    </div>
</template>

<script>
// importing feather icons
import { LogInIcon } from 'vue-feather-icons'

import { mapState } from 'vuex'

export default {
    name: 'Logon',
    components: {
        LogInIcon,
    },
    data() {
        return {
            email: '',
            password: '',
            deleteAlert: false,
        }
    },
    mounted() {
        if (this.$route.params.deleted === true) {
            this.deleteAlert = true
        }
    },
    methods: {
        async handleLogin() {
            const email = this.email
            const password = this.password
            
            await this.axios.post('sessions', { email, password })
            .then(response => {
                this.$store.commit('SET_ONG_NAME', response.data.name)
                this.$store.commit('SET_EXPIRE_TIME', response.data.expire_at)
                this.$store.commit('SET_EXPIRED', false)
                this.$store.commit('USER_LOGGED', true)

                this.$toast.success(`Bem vinda ${response.data.name}`)
                this.$router.push('/profile')
            })
            .catch((error) => {
                if (error.response.data.statusCode === 400) {
                    this.$toast.error(error.response.data.message)
                } else {
                    this.$toast.error(error.response.data.error)
                }
            })
        }
    },
    computed: {
        ...mapState([
            'expired'
        ])
    },
}
</script>

<style scoped>
.logon-container {
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
    /* transform: scale(.8); */
}

.logon-container section.form {
    width: 100%;
    max-width: 350px;
    margin-right: 30px;
}

.logon-container section.form form {
    margin-top: 60px;
}

.logon-container section.form form h1 {
    font-size: 32px;
    margin-bottom: 32px;
}

.logon-container section .confirmDelete {
    border: 1px solid rgb(219, 11, 11);
    border-radius: 8px;
    text-align: center;
    background: rgb(255, 186, 186);
    padding: 30px 10px;
    margin-top: 30px;
    color: rgb(219, 11, 11);
}
</style>