<template>
    <div class='logon-container'>
      <section class='form'>
        <img src="{{ logoImg }}" alt='Be The Hero' />
        <form @submit="handleLogin">
          <h1> Faça seu logon </h1>
          <input
            type="email"
            v-model="email"
            required
            placeholder='Seu e-mail'
          />
          <input
            style="margin-top: 10;"
            type="password"
            v-model="password"
            required
            placeholder='Sua senha'
          />
          <button class='button' type='submit'>
            Entrar
          </button>
      {(deleteAlert ?
          <div class="confirmDelete">
              Sua conta foi apagada, é uma pena que decidiu sair, crie uma conta nova quando quiser voltar, estaremos lhe esperando.
          </div>
      :
          ''
      )}
      {(expired === true ?
          <div class="confirmDelete">
              Sua sessão expirou, faça sua autenticação novamente para continuar.
          </div>
      :
          ''
      )}
          <router-link to='/register' class='svg-link'>
            <FiLogIn size={16} color='#E02041' />
            Não tenho cadastro
          </router-link>
        </form>
      </section>

      <img src="{{ heroesImg }}" alt='Heroes' />
    </div>
</template>

<script>
import logoImg from "../../assets/logo.svg"
import heroesImg from "../../assets/heroes.png"

export default {
    name: 'Logon'
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
    margin-top: 100px;
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