import React from 'react';
import {BrowserRouter , Route, Switch, Redirect} from 'react-router-dom';
import Home from '@containers/index';
import Detail from '@containers/detail';
import Login from '@containers/login';


const BasicRoute = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail:user" component={Detail} />
            <Route exact path="/login" component={Login} />
            <Redirect path="*" to="/" />
        </Switch>
    </BrowserRouter >
);


export default BasicRoute;
