const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

// instanciando os controladores
const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const IncidentController = require('./controllers/IncidentController');
const AccountController = require('./controllers/AccountController');

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
routes.delete('/ongs', celebrate(deleteOngValidation), OngController.delete);

// Rota Profile
routes.get('/profile', celebrate(profileValidation), ProfileController.index);

// Rota de conta
routes.get('/account', celebrate(accountValidation), AccountController.index);
routes.put('/account', celebrate(updateAccountValidation), AccountController.update);

// Rotas de incidents
routes.get('/incidents', celebrate(incidentsValidation), IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', celebrate(deleteIncidentValidation), IncidentController.delete);

module.exports = routes;
