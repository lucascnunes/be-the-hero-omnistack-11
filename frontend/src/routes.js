import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// carrega as paginas a serem navegadas pelas rotas do navegador
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Account from './pages/Account';

export default function Routes() {
    // retorna jsx
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/account" component={Account} />
                <Route path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}