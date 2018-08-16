import React, { Component } from 'react';
import { observer, inject } from '../../node_modules/mobx-react';
import './Messages.css';

@inject("store")
@observer
class Messages extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
  }

  getKeyword(lastMessage) {
    return lastMessage;
  }

  changeBg(message) {
    
  }

  render() {
    const messages = this.store.messages.map((message, i) => {
      return (
        <div key={i} className="Message">{message}</div>
      );
    });
    let style = {};
    if (this.store.bgUrl != null) {
      style = {
        backgroundImage: `url(${this.store.bgUrl})`,
      };
    }
    return (
      <section className="Messages" style={style}>
        {messages}
      </section>
    );
  }
}

export default Messages;