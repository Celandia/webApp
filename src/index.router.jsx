import React from 'react';
import {BrowserRouter , Route, Switch, Redirect} from 'react-router-dom';
import Home from '@containers/index';
import Detail from '@containers/detail';


const BasicRoute = () => (
    <BrowserRouter >
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/detail:user" component={Detail} />
            <Redirect path="*" to="/" />
        </Switch>
    </BrowserRouter >
);


export default BasicRoute;
