import React from 'react';
import {Link} from 'react-router-dom';
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
        console.log(this.props);
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
        })
    }

    render() {
        return (
            <div className='home-container'>
                这里是首页
                <p>Hello {this.state.user}</p>
                <img
                    src='//img30.360buyimg.com/mobilecms/jfs/t24286/294/748190923/74707/2c2323bc/5b3ed831N1924b882.gif'/>
                <img src={require('@assets/img/edit.png')}/>
                {/*<a href='/detail'>去详情页</a>*/}
                <Link to={'detail: ' + this.state.user}>去详情页</Link>
            </div>
        )
    }
}
