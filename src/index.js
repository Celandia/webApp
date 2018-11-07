import ReactDOM from 'react-dom';
import React, {Component} from 'react';
import '@assets/style/base.scss';
import {getJson} from '@utils/request';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {user: '……'};
    }

    componentWillMount() {
        console.log(this);
        const it = this;

        getJson(
            '/api/user.json',
            {
                body: {
                    user: 'chengyan'
                }
            }
        ).then(function (res) {
            console.log(res.data.user);
            console.log(this); // this指向不对
            it.setState({
                user: res.data.user
            })
        }).catch(function (err) {
            console.log(err);
        })
    }

    render() {
        return (
            <div>
                <p>Hello {this.state.user}</p>
                <img
                    src='//img30.360buyimg.com/mobilecms/jfs/t24286/294/748190923/74707/2c2323bc/5b3ed831N1924b882.gif'/>
                <img src={require('./assets/img/edit.png')}/>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById("app")
);
