const express = require('express');
const jwt = require('express-jwt');
const { celebrate } = require('celebrate');

const config = require('./config');

// instanciando os controladores
const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');

// instanciando as validações
const loginValidation = require('./validations/Session/LoginValidation');
const logoutValidation = require('./validations/Session/LogoutValidation');
const createOngValidation = require('./validations/Ong/CreateOngValidation');
const deleteOngValidation = require('./validations/Ong/DeleteOngValidation');
const profileValidation = require('./validations/Profile/ProfileValidation');
const accountValidation = require('./validations/Account/AccountValidation');
const updateAccountValidation = require('./validations/Account/UpdateAccountValidation');
const incidentsValidation = require('./validations/Incident/IncidentsValidation');
const deleteIncidentValidation = require('./validations/Incident/DeleteIncidentValidation');

const routes = express.Router();

const jwtCookie = require('./utils/jwt.cookie');

// Rota de login
routes.post('/sessions', celebrate(loginValidation), SessionController.create);
routes.put('/sessions', SessionController.update);
routes.delete('/sessions', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(logoutValidation), SessionController.delete);

// Rotas de ONGs
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate(createOngValidation), OngController.create);
routes.delete('/ongs', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(deleteOngValidation), OngController.delete);

// Rota de conta da ONG
routes.get('/account', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(accountValidation), OngController.show);
routes.put('/account', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(updateAccountValidation), OngController.update);

// Rota Profile
routes.get('/profile', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(profileValidation), ProfileController.index);

// Rotas de incidents
routes.get('/incidents', celebrate(incidentsValidation), IncidentController.index);
routes.post('/incidents', jwt({secret:config.token.secret, getToken: jwtCookie}), IncidentController.create);
routes.get('/incidents/:id', jwt({secret:config.token.secret, getToken: jwtCookie}), IncidentController.show);
routes.put('/incidents/:id', jwt({secret:config.token.secret, getToken: jwtCookie}), IncidentController.update);
routes.delete('/incidents/:id', jwt({secret:config.token.secret, getToken: jwtCookie}), celebrate(deleteIncidentValidation), IncidentController.delete);

module.exports = routes;
