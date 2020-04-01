import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// carrega as paginas a serem navegadas pelas rotas do navegador
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import EditIncident from './pages/EditIncident';
import Account from './pages/Account';

import { isAuthenticated } from './services/auth';



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route 
        { ...rest }
        render={ props => 
            isAuthenticated() ? (
                <Component { ...props } />
            ) : (
                <Redirect to={{ pathname: '/', state: { from: props.location } }} />
            )
        } 
    />
);
            
const GuestRoute = ({ component: Component, ...rest }) => (
    <Route 
        { ...rest }
        render={ props => 
            isAuthenticated() ? (
                <Redirect to={{ pathname: '/profile', state: { from: props.location } }} />
            ) : (
                    <Component { ...props } />
            )
        } 
    />
);

export default function Routes() {
    // retorna jsx
    return (
        <BrowserRouter>
            <Switch>
                <GuestRoute path="/" exact component={Logon} />
                <GuestRoute path="/register" component={Register} />
                <PrivateRoute path="/profile" component={Profile} />
                <PrivateRoute path="/account" component={Account} />
                <Route path="/incidents" exact component={EditIncident} />
                <PrivateRoute path="/incidents/new" component={NewIncident} />
            </Switch>
        </BrowserRouter>
    );
}