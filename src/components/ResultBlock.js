import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './ResultBlock.css';
import resultCopy from '../data/resultCopy';

const ResultBlock = props => {
  const game = props.multiplayer[props.multiplayer.currentGame];

  const [resultText, setResultText] = useState('');
  const [percent, setPercent] = useState(0);

  const roundTo2 = num => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const percentCalc = (num1, num2) => {
    return Math.abs(100 - (num1 / num2) * 100);
  };

  const numberFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  useEffect(() => {
    const percent = percentCalc(
      props.guessNum,
      props.subredditInfo.subscribers
    );
    setPercent(percent);
    console.log('percent:', percent);
    const percentRange = Object.keys(resultCopy).sort((a, b) => b - a);
    percentRange.forEach(resultPercent => {
      if (parseInt(resultPercent, 10) >= percent) {
        const copySelection = Math.floor(
          Math.random() * (resultCopy[resultPercent].length - 1)
        );
        setResultText(resultCopy[resultPercent][copySelection]);
        return;
      }
    });
  }, []);

  return (
    <div className="ui results-block">
      <div>
        <h2 className="ui header">{resultText}</h2>
        <h3 className="ui header">
          /r/{numberFormat(game.currentSub.display_name)} has{' '}
          {numberFormat(game.currentSub.subscribers)} subscribers.{' '}
        </h3>
        <p>You were {roundTo2(percent)}% out.</p>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(ResultBlock);
