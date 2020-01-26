import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Message from '../Message/Message.jsx';
import './style.css';

export default class Messages extends Component {
    constructor (props) {
        super (props)

        this.state = {
            messages: [
                {body: 'Здравствуйте', author: null}, 
                {body: 'Хотел спросить', author: null}
            ]
        }
    }
    componentDidUpdate () {
        let msgs = this.state.messages
        if (msgs.length % 2 === 1) {
            setTimeout (() => {
                this.setState (
                    {
                        messages: [...this.state.messages, {body: 'Ваш звонок очень важен для нас', author: 'mr. Robo'}]
                    }
                )
            }, 1000)
        }
    }
    sendMessage = () => {
        this.setState ({
            messages: [...this.state.messages, {body: 'Что-нибудь можно сделать с этим сайтом?'}]
        })
    }
    render () {
        let { user } = this.props
        let { messages } = this.state

        let MessageArr = messages.map (message => <Message msg={ {
            usrName: message.author ? message.author : user, 
            msgBody: message.body
        } }/>)

        return (
            <div className="msg-wrapper">
                <h1 className="title-chat">Telega</h1>
                <div className="text-chat">{ MessageArr }</div>
                <button onClick = { this.sendMessage }>Send</button>
            </div>
        )
    }
}