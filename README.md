
# Be The Hero - Semana OmniStack 11

 Projeto desenvolvido na semana OmniStack 11 da [Rocketseat](https://rocketseat.com.br/) dias 23/03/2020 à 27/03/2020.

Com as aulas online do Diego Fernandes.
  
## Projeto

Criar uma plataforma web/mobile utilizando *React* e *React-native* para frontend da web e mobile respectivamente e utilizar *Express* para o backend.
  
### Pré requisitos

```
git, node, express, knex, sqlite, react, react-native, expo
```
  
### Instalação

Clone o repositório, utilizando **git clone** ou faça o **download** do repositório.

**aviso que o arquivo de gravação de tela do emulador que esta na pasta vídeo possui 25mb**



Após clonar ou baixar o repositório instale as dependências necessárias:

Utilize o **npm** para instalar as dependências nas pastas *backend*, *frontend*, *mobile*.

```
npm install
```
Após instalar as dependências você precisa rodar o comando do knex para criar o banco de dados SQLite e as rodar as migrações. 

```
npx knex migrate:latest
```

Após a geração do banco de dados e das migrações você poderá rodar o backend, frontend e mobile utilizando

**Para o backend e frontend:**
```
npm start
```

**Para o mobile**
```
expo start
```
Para visualização da aplicação mobile utilize o celular com o aplicativo *Expo* ou emulador Android/iOS.


## Mudanças

Adicionei algumas mudanças pessoais ao código então o mesmo não se encontra fiel as aulas, seguem abaixo:

* Banco de dados mantive o campo **id** do SQL intacto e adicionei um campo **key** para ser usado como identificado das ONGs

* Adicionei uma janela de confirmação de cadastro de nova ONG no *frontend*.
```
RegisterSuccess
```
  * Adicionei funções de refresh do FlatList no mobile para exibir o carregamento de novos casos:
```
onRefresh={loadIncidents}
refreshing={loading}
```
  * Adicionado paginação no perfil da ONG frontend.
  * Adicionado tela de edição de ONG
  * Adicionado botão de apagar conta
  * Adicionado alertas de confirmação de conta atualizada e conta deletada

## Autor

**Lucas Nunes** 
* [Github](https://github.com/lucascnunes)
* Discord - Chizuko#0959

## License

This project is licensed under the MIT License

## Agradecimentos

* Rocketseat
* Diego Fernandes
