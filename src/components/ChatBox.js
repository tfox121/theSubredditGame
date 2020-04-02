import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Popup } from 'semantic-ui-react';
import timeago from 'time-ago';
import TextareaAutosize from 'react-textarea-autosize';

import {
  createMessageMultiplayer,
  updateCall,
  dissmissNotification
} from '../actions';
import './ChatBox.css';

const ChatBox = props => {
  const [text, setText] = useState('');
  const [chatboxOpen, setChatboxOpen] = useState(false);

  const { game, currentPlayer } = props;

  const messageCount = game.messages.length;

  useEffect(() => {
    setChatboxOpen(true);
    setChatboxOpen(false);
  }, []);

  useEffect(() => {
    updateScroll();
  }, [messageCount, chatboxOpen]);

  const openHandler = () => {
    setChatboxOpen(true);
    props.dissmissNotification();
  };

  const closeHandler = () => {
    setChatboxOpen(false);
    props.dissmissNotification();
  };

  const updateScroll = () => {
    var element = document.querySelector('#chatbox');
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  };

  const handleTextChange = event => {
    setText(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await props.createMessageMultiplayer(game._id, currentPlayer, text);
    setText('');
    updateCall('MESSAGE', game._id);
  };

  const handleKeyDown = event => {
    if ((window.event ? event.keyCode : event.which) === 13) {
      handleSubmit(event);
    }
  };

  const handleMouseDown = event => {
    if (event) {
      event.preventDefault();
    }
  };

  const lineRender = (index, message) => {
    if (
      index !== messageCount - 1 &&
      message.playerName !== game.messages[index + 1].playerName
    ) {
      return <hr className="horizontal-line" />;
    }
  };

  const originalMessageRender = message => {
    return (
      <div key={message._id} className="event">
        <div className="label">
          <img
            style={{
              display: message.playerName === currentPlayer && 'none'
            }}
            src={`https://avatars.dicebear.com/v2/identicon/${message.playerName}.svg`}
            alt="avatar"
          />
        </div>
        <div
          className={`content additional ${message.playerName ===
            currentPlayer && 'right'}`}
        >
          <div className="summary">
            {message.playerName}
            {message.playerName !== currentPlayer && (
              <div className="date">{timeago.ago(message.timeReceived)}</div>
            )}
          </div>
          {message.playerName === currentPlayer && (
            <>
              <div className="own date">
                {timeago.ago(message.timeReceived)}
              </div>
            </>
          )}
          <div>
            <div className="extra text">{message.message}</div>
          </div>
        </div>
      </div>
    );
  };

  const additionalMessagesRender = message => {
    return (
      <div className="event additional">
        <div className="label"></div>
        <div
          className={`content additional ${message.playerName ===
            currentPlayer && 'right'}`}
        >
          <div>
            <div className="extra text additional">{message.message}</div>
          </div>
        </div>
      </div>
    );
  };

  const messageLayout = (message, index) => {
    if (
      index > 0 &&
      game.messages[index - 1].playerName === message.playerName
    ) {
      return additionalMessagesRender(message);
    }
    return originalMessageRender(message);
  };

  const messageRender = () => {
    if (!messageCount) {
      return 'Chat here!';
    }
    return game.messages.map((message, index) => {
      return (
        <React.Fragment key={message._id}>
          {messageLayout(message, index)}
          {lineRender(index, message)}
        </React.Fragment>
      );
    });
  };

  const chatboxRender = () => {
    return (
      <>
        <div className="ui segment" id="chatbox">
          <div className="ui feed">{messageRender()}</div>
        </div>
        <form
          className="ui form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
        >
          <TextareaAutosize
            className="field"
            name="message"
            value={text}
            onChange={handleTextChange}
            autoComplete="off"
            type="text"
          />
          <button className="ui button">Send</button>
        </form>
      </>
    );
  };

  const PopupChat = () => (
    <Popup
      className="chatbox"
      content={chatboxRender()}
      on="click"
      onClose={closeHandler}
      onOpen={openHandler}
      open={chatboxOpen}
      pinned
      trigger={
        <Button
          className={`chatbox-expand ${
            props.newMessage && !chatboxOpen ? 'blue' : ''
          }`}
          onMouseDown={handleMouseDown}
        >
          <div>Chat</div>
          {props.newMessage && !chatboxOpen && (
            <i className="comment outline icon"></i>
          )}
        </Button>
      }
    />
  );

  return PopupChat();
};

const mapStateToProps = state => {
  return { newMessage: state.multiplayer.newMessage };
};

export default connect(mapStateToProps, {
  createMessageMultiplayer,
  dissmissNotification
})(ChatBox);
