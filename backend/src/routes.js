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
const sessionValidation = require('./validations/Session/SessionValidation');
const createOngValidation = require('./validations/Ong/CreateOngValidation');
const deleteOngValidation = require('./validations/Ong/DeleteOngValidation');
const profileValidation = require('./validations/Profile/ProfileValidation');
const accountValidation = require('./validations/Account/AccountValidation');
const updateAccountValidation = require('./validations/Account/UpdateAccountValidation');
const incidentsValidation = require('./validations/Incident/IncidentsValidation');
const deleteIncidentValidation = require('./validations/Incident/DeleteIncidentValidation');

const routes = express.Router();

// Rota de login
routes.post('/sessions', celebrate(sessionValidation), SessionController.create);

// Rotas de ONGs
routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate(createOngValidation), OngController.create);
routes.delete('/ongs', jwt({secret:config.token.secret}), celebrate(deleteOngValidation), OngController.delete);

// Rota de conta da ONG
routes.get('/account', jwt({secret:config.token.secret}), celebrate(accountValidation), OngController.show);
routes.put('/account', jwt({secret:config.token.secret}), celebrate(updateAccountValidation), OngController.update);

// Rota Profile
routes.get('/profile', jwt({secret:config.token.secret}), celebrate(profileValidation), ProfileController.index);

// Rotas de incidents
routes.get('/incidents', celebrate(incidentsValidation), IncidentController.index);
routes.post('/incidents', jwt({secret:config.token.secret}), IncidentController.create);
routes.get('/incidents/:id', jwt({secret:config.token.secret}), IncidentController.show);
routes.put('/incidents/:id', jwt({secret:config.token.secret}), IncidentController.update);
routes.delete('/incidents/:id', jwt({secret:config.token.secret}), celebrate(deleteIncidentValidation), IncidentController.delete);

module.exports = routes;
