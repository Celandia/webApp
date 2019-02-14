import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '@assets/style/common.scss';
import '@assets/style/base/flexible';
import Router from './index.router';
import replacer from 'webpack-theme-color-replacer/client';

// 将主色调替换 
replacer.elementUI.changeColor({
    primary: { // primary color
        oldColor: '#1890ff',   // 需要替换掉的主色调
        newColor: '#0cdd3a',   // 新的皮肤
    },
    cssUrl: 'css/theme.css' // 替换样式的文件路径
});


ReactDOM.render(
    <Router />,
    document.getElementById("app")
);
