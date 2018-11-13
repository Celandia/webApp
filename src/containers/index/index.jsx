import React from 'react';
import {Link} from 'react-router-dom';
import {getJson} from '@utils/request';
import {DatePicker, Button, message} from 'antd';
import './index.scss';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '……'
        }
    }

    componentWillMount() {
        getJson(
            '/api/user.json',
            {
                body: {
                    username: 'admin'
                }
            }).then(res => {
            console.log(res);
            this.setState({
                user: res.data.user
            })
        }).catch(err => {
            console.log(err)
        });
        var scrollHandler = this.handleScroll.bind(this);
        window.addEventListener('scroll', scrollHandler);
    }

    handleScroll() {
        this.setState({
            needRender: false
        });
    }

    onClinkEvent() {
        message.info('This is a message', 1);
    }

    render() {
        console.log(1)
        return (
            <div className='home-container'>
                这里是首页
                <p>Hello {this.state.user}</p>
                <DatePicker/>
                <Button onClick={this.onClinkEvent.bind(this)}>Default</Button>
                <img
                    src='//img30.360buyimg.com/mobilecms/jfs/t24286/294/748190923/74707/2c2323bc/5b3ed831N1924b882.gif'/>
                <img src={require('@assets/img/edit.png')}/>
                <div>
                    <a href='/login'>去登录</a>
                </div>
                <Link to={'detail: ' + this.state.user}>去详情页</Link>
                <div className='box'>占位子</div>
            </div>
        )
    }
}
