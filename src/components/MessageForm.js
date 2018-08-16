import React, { Component } from 'react';
import { inject } from '../../node_modules/mobx-react';
import './Messages.css';

@inject("store")
class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.state = {
      message: '',
    };
  }
  render() {
    return (
      <footer className="MessageForm">
        <form onSubmit={e => {
          e.preventDefault();
          if (this.state.message.trim().length > 0) {
            this.store.user.sendMessage({
              text: this.state.message,
              roomId: this.store.user.rooms[0].id,
            });
            this.setState({
              message: '',
            });
          }
        }}>
          <input
            type="text"
            value={this.state.message}
            placeholder="Type a message and press Enter!"
            onChange={e => {
              this.setState({
                message: e.target.value,
              });
            }}
          />
        </form>
      </footer>
    );
  }
}

export default MessageForm;