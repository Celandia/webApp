import React from 'react';
import {getJson} from '@utils/request';
import './index.scss';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '……'
        }
    }

    componentWillMount() {

    }

    loginEvent(){
        console.log('登录')
    }

    render() {
        return (
            <div className='login-container'>
                <div onClick={this.loginEvent.bind(this)}>登录</div>
            </div>
        )
    }
}
