import React, { useLayoutEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import timeAgo from '../timeAgo';
import { Accordion } from 'semantic-ui-react';

import { fetchGamesByClientMultiplayer, joinGameMultiplayer } from '../actions';
import './MultiplayerGameList.css';

export const MultiplayerGameList = (props) => {
  const [gameList, setGameList] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  const { clientId, multiplayer, fetchGamesByClientMultiplayer } = props;

  const handleAccordianClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };

  useLayoutEffect(() => {
    if (clientId) {
      const fetchData = async () => {
        await fetchGamesByClientMultiplayer(clientId);
      };
      fetchData();
    }
  }, [clientId, fetchGamesByClientMultiplayer]);

  useLayoutEffect(() => {
    const gameListQuantity = Object.keys(multiplayer).length - 5;
    if (gameListQuantity) {
      const games = _.chain(multiplayer).pickBy(_.isObject).values().value();

      const filteredGames = games.filter((game) => {
        return !game.gameComplete;
      });

      setGameList(filteredGames);
    }
  }, [multiplayer]);

  const findPlayerName = (gameId, clientId) => {
    let playerName;
    props.multiplayer[gameId].players.forEach((player) => {
      if (player.clientId === clientId) {
        playerName = player.name;
      }
    });
    return playerName;
  };

  const onClickHandler = (event) => {
    event.preventDefault();
    const playerName = findPlayerName(event.target.id, props.clientId);
    console.log('PLAYER', playerName);
    props.joinGameMultiplayer(event.target.id, playerName, props.clientId);
  };

  if (!gameList) {
    return <h2 className="ui header">No Current Games...</h2>;
  }

  const roundTextRender = (game) => {
    if (game.gameStarted) {
      return (
        <>
          (Round {game.currentRound}/{game.rounds})
        </>
      );
    }
    return <>Not started</>;
  };

  const actionCheck = (game) => {
    let actionRequired = false;
    if (game.roundComplete && game.gameStarted) {
      game.players.forEach((player) => {
        if (player.clientId === clientId && !player.readyForNext) {
          actionRequired = true;
          // console.log('CONTINUE TO NEXT ROUND');
        }
      });
    }
    if (!game.roundComplete && game.gameStarted) {
      game.players.forEach((player) => {
        if (player.clientId === clientId && player.currentGuess === '') {
          actionRequired = true;
          // console.log('MAKE A GUESS');
        }
      });
    }
    if (!game.gameStarted) {
      game.players.forEach((player) => {
        if (player.clientId === clientId && !player.readyForNext) {
          actionRequired = true;
          // console.log('BEGIN GAME');
        }
      });
    }
    return actionRequired;
  };

  const renderGames = () => {
    return gameList
      .sort((a, b) => {
        if (Date.parse(a.lastAction) < Date.parse(b.lastAction)) {
          return 1;
        }
        if (Date.parse(a.lastAction) > Date.parse(b.lastAction)) {
          return -1;
        }
        return 0;
      })
      .map((game) => {
        return (
          <tr key={game._id} className={actionCheck(game) && 'positive'}>
            <td className="table-id">
              {game._id}
              <p className="table-round-info">{roundTextRender(game)}</p>
            </td>
            <td className="table-players">{game.players.length}</td>
            <td className="table-last-action">
              {timeAgo.format(Date.parse(game.lastAction), 'twitter') || '<1m'}
              <br />
              <p className="table-created-info">
                (created{' '}
                {timeAgo.format(Date.parse(game.timeCreated), 'twitter')} ago)
              </p>
            </td>
            <td className="table-join">
              <button
                id={game._id}
                onClick={onClickHandler}
                className="ui button"
              >
                go!
              </button>
            </td>
          </tr>
        );
      });
  };

  const renderAccordian = () => {
    return (
      <Accordion fluid>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleAccordianClick}
        >
          <h2 className="ui header">
            <i class="dropdown icon"></i>your games
            <i class="dropdown icon"></i>
          </h2>
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <table className="ui selectable very basic selectable unstackable celled table">
            <thead>
              <tr>
                <th className="table-id">ID</th>
                <th className="table-players">players</th>
                <th className="table-last-action">
                  last
                  <br />
                  action
                </th>
                <th className="table-join">join</th>
              </tr>
            </thead>
            <tbody>{renderGames()}</tbody>
          </table>
        </Accordion.Content>
      </Accordion>
    );
  };

  return renderAccordian();
};

const mapStateToProps = (state) => {
  return {
    clientId: state.multiplayer.clientId,
    multiplayer: state.multiplayer,
  };
};

export default connect(mapStateToProps, {
  fetchGamesByClientMultiplayer,
  joinGameMultiplayer,
})(MultiplayerGameList);
