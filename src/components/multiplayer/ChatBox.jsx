import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import TextareaAutosize from 'react-textarea-autosize';

import timeAgo from '../../timeAgo';

import webSocket from '../../api/websocket';
import {
  createMessageMultiplayer,
  // updateCall,
  dissmissNotification,
  fetchGameMultiplayer,
  newMessageNotifier,
} from '../../actions';
import './ChatBox.css';

const ChatBox = (props) => {
  const { game, currentPlayer, newMessage } = props;
  const [text, setText] = useState('');
  const [chatboxOpen, setChatboxOpen] = useState(false);

  const messageCount = game.messages.length;

  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    switch (data.type) {
      case 'MESSAGE':
        console.log('New message received');
        props.newMessageNotifier();
        props.fetchGameMultiplayer(data.game);
        break;
      default:
    }
  };

  const updateScroll = () => {
    const element = document.querySelector('#chatbox');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  useEffect(() => {
    setChatboxOpen(true);
    setChatboxOpen(false);
  }, []);

  useEffect(() => {
    updateScroll();
  }, [messageCount, chatboxOpen]);

  // useEffect(() => {
  //   props.fetchGameMultiplayer(_id);
  // }, [_id, props.fetchGameMultiplayer, newMessageCount]);

  const openHandler = () => {
    setChatboxOpen(true);
    props.dissmissNotification();
  };

  const closeHandler = () => {
    setChatboxOpen(false);
    props.dissmissNotification();
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await props.createMessageMultiplayer(game._id, currentPlayer, text);
    setText('');
    // updateCall('MESSAGE', game._id);
  };

  const handleKeyDown = (event) => {
    if ((window.event ? event.keyCode : event.which) === 13) {
      handleSubmit(event);
    }
  };

  const handleMouseDown = (event) => {
    if (event) {
      event.preventDefault();
    }
  };

  const lineRender = (index, message) => {
    if (
      index !== messageCount - 1
      && message.playerName !== game.messages[index + 1].playerName
    ) {
      return <hr className="horizontal-line" />;
    }
    return null;
  };

  const originalMessageRender = (message) => (
    <div key={message._id} className="event">
      <div className="label">
        <img
          style={{
            display: message.playerName === currentPlayer && 'none',
          }}
          src={`https://avatars.dicebear.com/v2/identicon/${message.playerName}.svg`}
          alt="avatar"
        />
      </div>
      <div className={`content additional ${message.playerName === currentPlayer && 'right'}`}>
        <div className="summary">
          {message.playerName}
          {message.playerName !== currentPlayer && (
            <div className="date">
              {timeAgo.format(Date.parse(message.timeReceived))}
            </div>
          )}
        </div>
        {message.playerName === currentPlayer && (
          <>
            <div className="own date">
              {timeAgo.format(Date.parse(message.timeReceived))}
            </div>
          </>
        )}
        <div>
          <div className="extra text">{message.message}</div>
        </div>
      </div>
    </div>
  );

  const additionalMessagesRender = (message) => (
    <div className="event additional">
      <div className="label" />
      <div
        className={`content additional ${message.playerName === currentPlayer && 'right'}`}
      >
        <div>
          <div className="extra text additional">{message.message}</div>
        </div>
      </div>
    </div>
  );

  const messageLayout = (message, index) => {
    if (
      index > 0
      && game.messages[index - 1].playerName === message.playerName
    ) {
      return additionalMessagesRender(message);
    }
    return originalMessageRender(message);
  };

  const messageRender = () => {
    if (!messageCount) {
      return 'Chat here!';
    }
    return game.messages.map((message, index) => (
      <React.Fragment key={message._id}>
        {messageLayout(message, index)}
        {lineRender(index, message)}
      </React.Fragment>
    ));
  };

  const chatboxRender = () => (
    <>
      <div className="ui segment" id="chatbox">
        <div className="ui feed">{messageRender()}</div>
      </div>
      <form className="ui form" onSubmit={handleSubmit}>
        <TextareaAutosize
          className="field"
          name="message"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          type="text"
        />
        <button type="submit" className="ui button">
          send
        </button>
      </form>
    </>
  );

  const PopupChat = () => (
    <Popup
      className="chatbox"
      content={chatboxRender()}
      on="click"
      onClose={closeHandler}
      onOpen={openHandler}
      open={chatboxOpen}
      pinned
      trigger={(
        <Button
          className={`chatbox-expand ${newMessage && !chatboxOpen ? 'blue' : ''}`}
          onMouseDown={handleMouseDown}
        >
          <div>chat</div>
          {newMessage && !chatboxOpen && <i className="comment outline icon" />}
        </Button>
      )}
    />
  );

  return PopupChat();
};

const mapStateToProps = (state) => ({
  newMessage: state.multiplayer.newMessage,
  newMessageCount: state.multiplayer.newMessageCount,
});

export default connect(mapStateToProps, {
  createMessageMultiplayer,
  dissmissNotification,
  fetchGameMultiplayer,
  newMessageNotifier,
})(ChatBox);
