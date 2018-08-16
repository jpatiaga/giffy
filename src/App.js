import React, { Component } from 'react';
import Messages from './components/Messages';
import MessageForm from './components/MessageForm';
import Chatkit from '@pusher/chatkit';
import './App.css';
import { observer, inject } from '../node_modules/mobx-react';

@inject("store")
@observer
class App extends Component {
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: 'v1:us1:41373f5a-8bd2-4f48-8edc-0ff5195a86db',
      userId: 'user1',
      tokenProvider: new Chatkit.TokenProvider({
        url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/41373f5a-8bd2-4f48-8edc-0ff5195a86db/token'
      }),
    });

    chatManager
      .connect()
      .then(currentUser => {
        console.log("Connected as user ", currentUser);
        this.props.store.user = currentUser;
        currentUser.subscribeToRoom({
          roomId: currentUser.rooms[0].id,
          hooks: {
            onNewMessage: message => {
              console.log(`Received new message: ${message.text}`);
              console.log(this.props.store);
              this.props.store.messages.push(message.text);

              const keyword = message.text;
              const bgUrl = `https://api.tenor.com/v1/search?tag=${keyword}&key=5SANH3JZVQIP&limit=1`;
              fetch(bgUrl)
                .then(response => {
                  return response.json();
                })
                .then(responseJson => {
                  if (responseJson.results.length > 0) {
                    console.info(responseJson.results[0]);
                    this.props.store.bgUrl = responseJson.results[0].media[0].gif.url;
                  } else {
                    this.props.store.bgUrl = null;
                  }
                });
            }
          },
          messageLimit: 0,
        });
      })
      .catch(error => {
        console.error("error:", error);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Giffy Chat</h1>
        </header>
        <Messages />
        <MessageForm />
      </div>
    );
  }
}

export default App;
