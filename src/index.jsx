import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '@assets/style/common.scss';
import '@assets/style/base/flexible';
import Router from './index.router';


ReactDOM.render(
    <Router/>,
    document.getElementById("app")
);
