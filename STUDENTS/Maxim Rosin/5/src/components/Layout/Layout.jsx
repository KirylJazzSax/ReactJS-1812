import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Messages from '../Messages/Messages.jsx'
import Header from '../Header/Header.jsx'
import ChatList from '../ChatList/ChatList.jsx'
import { sendMessage } from "../../actions/message_actions.js";

import './style.css'

//store
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Layout extends Component {
    static propTypes = {
        chatId: PropTypes.number,
        sendMessage: PropTypes.func.isRequired,
    }

    static defaultProps = {
        chatId: 1,
    }

    state = {
        chats: {
            1: { title: 'Чат 1', messagesList: [1] },
            2: { title: 'Чат 2', messagesList: [2] },
            3: { title: 'Чат 3', messagesList: [] }
        },
        messages: {
            1: { text: 'Hello', sender: 'bot' }, 
            2: { text: 'What is up?', sender: 'bot' }
        },
        inputText: '',
    }

    componentDidUpdate (prevProps, prevState) {
        const { messages } = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].sender === 'You') {
            setTimeout(() =>
                this.sendMessage('Не приставай ко мне, я робот!', 'bot'), 1000);
        }
    }

    sendMessage = (message, sender) => {
        const { messages } = this.state;
        const { chatId } = this.props;
 
        const messageId = Object.keys(messages).length + 1;
        this.setState({
            messages: {...messages,
                [messageId]: {text: message, sender: sender}},
        });
        this.props.sendMessage(messageId, message, sender, chatId);
    };

    addChat = (title) => {
        let { chats } = this.state;

        let chatId = Object.keys(chats).lenght + 1;
        this.setState({
            chats: {...chats,
                [chatId]: {title: title, messageList: []}
            },
        })
    }

    render () {
        return (
            <div className = "d-flex justify-content-center w-100 layout">
                <Header chatId = { this.props.chatId } />
                <div className = "d-flex justify-content-center w-100 layout-left-side">
                    <div className = "pr-5 w-30">
                    <ChatList />
                    </div>
                    <div className = "d-flex justify-content-center w-100 layout-right-side">
                    <Messages
                           chatId={ this.props.chatId }
                           messages={ this.state.messages }
                           sendMessage={ this.sendMessage }
                       />
                    </div>
                </div>
            </div>
        )
    }
}

let mapStateToProps = ({}) => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);