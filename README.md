<p align="center">
 <img align="center" src="https://github.com/lucascnunes/be-the-hero-omnistack-11/blob/master/react-frontend/src/assets/logo.svg">
</p>

![Be The Hero](https://github.com/lucascnunes/be-the-hero-omnistack-11/blob/master/screenshots/frontend/inicial%20atual/screen1.png)

# Be The Hero - Semana OmniStack 11

 Projeto desenvolvido na semana OmniStack 11 da [Rocketseat](https://rocketseat.com.br/) dias 23/03/2020 à 27/03/2020.

Com as aulas online do Diego Fernandes.

O projeto ensinado encontra-se [Semana OmniStack 11](https://github.com/Rocketseat/semana-omnistack-11)
  
## Projeto

Criar uma plataforma web/mobile utilizando *React* e *React-native* para frontend da web e mobile respectivamente e utilizar *Express* para o backend.

**Meu projeto está bem modificado do que foi dado durante a aula, caso queira ver o projeto como foi idealizado e ensinado veja o github da Rocketseat acima**
  
### Tecnologias utilizadas

```
git, node, express, knex, sqlite, reactjs, react-native, expo, vuejs
```

### Instalação

Clone o repositório, utilizando **git clone** ou faça o **download** do repositório.

**aviso que o arquivo de gravação de tela do emulador que esta na pasta vídeo possui 25mb**

----

Após clonar ou baixar o repositório instale as dependências necessárias:

Utilize o **npm** para instalar as dependências nas pastas *backend*, *react-frontend*, *vue-frontend*, *mobile*.

```
npm install
```
Após instalar as dependências você precisa rodar o comando do knex no **backend** para criar o banco de dados SQLite e rodar as migrações. 

```
npx knex migrate:latest
```

Após a geração do banco de dados e das migrações você poderá rodar o backend, react-frontend, vue-frontend e mobile utilizando...

**Para o backend e react-frontend:**
```
npm start
```

**Para o vue-frontend:**
```
npm run serve
```

**Para o mobile**
```
expo start
```
Para visualização da aplicação mobile utilize o celular com o aplicativo *Expo* ou emulador Android/iOS.


## Mudanças

Mudanças feitas no projeto idealizado da aula para aprendizado, preferências pessoais e teste de tecnologias:

#### Backend - Express

  * Banco de dados mantive o campo **id** do SQL intacto e adicionei um campo **key** para ser usado como identificado das ONGs
  * Adicionei os **testes** ao backend (**atualizado com teste jwt**)
  * Adicionei a pasta **http** com *REST requests* para rodar no **vscode** usando o pacote **Rest Client** caso não queira utilizar *insomnia* ou *postman*

#### ReactJS - Frontend

  * Adicionei uma janela de confirmação de cadastro de nova ONG no *frontend*.
```
RegisterSuccess
```
  * Adicionado **paginação** no perfil da ONG frontend.
  * Adicionado página de **edição** de ONG
```
Account
```
  * Adicionado botão de **apagar conta** na página de edição da ONG
  * Adicionado alertas de confirmação de conta atualizada na página de perfil e de conta apagada na página inicial
  * Adicionado página para **atualizar** caso
```
EditIncident
```
  * Removi o campo **KEY** da tabela **ongs**
  * Adicionei os timestamps **created_at** e **updated_at** às tabelas **ongs** e **incidents**
  * Adicionado autenticação com **JWT**
  * Adicionado **envio de e-mail** após o cadastro
  * Armazenamento do **token JWT** utilizando cookie **httpOnly**
  * *(em breve)* adicionar **Redux** para lidar com as states

#### React Native - Mobile

  * Adicionei a exibição da **cidade** e do **estado** nos detalhes do caso.
  * Adicionei funções de refresh do **FlatList** no mobile para exibir o carregamento de novos casos:
```
onRefresh={loadIncidents}
refreshing={loading}
```
  * Se não tiver nenhum caso para exibir fará requisição para listar casos a cada **30** segundos
  * Arrumei a disposição das informações conforme está no [Figma](https://www.figma.com/file/2C2yvw7jsCOGmaNUDftX9n/Be-The-Hero---OmniStack-11?node-id=37%3A394)

#### VueJS - Frontend

  * Adicionei um **frontend** feito em **VueJS**
  * Utilizando **Vuex** para armazenamento de states e variaveis que eram armazenadas manualmente no *localStorage*

## Autor

**Lucas Nunes** 
* [Github](https://github.com/lucascnunes)
* Discord - Chizuko#0959

## License

This project is licensed under the MIT License

## Agradecimentos

* [Rocketseat](https://github.com/Rocketseat)
* [Diego Fernandes](https://github.com/diego3g)
