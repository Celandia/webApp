import React from 'react';
import {getJson} from '@utils/request';
import './index.scss';

export default class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentWillMount() {
        console.log(this.props.match.params)
    }

    render() {
        return (
            <div className='detail-container'>
                这里是详情页哟
            </div>
        )
    }
}
