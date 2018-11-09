import React from 'react';
import ReactDOM from 'react-dom';
import '@assets/style/common.scss';
import '@assets/style/base/flexible';
import Router from './index.router';


ReactDOM.render(
    <Router/>,
    document.getElementById("app")
);
