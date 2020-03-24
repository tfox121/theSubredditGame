import React from 'react';

import './MultiplayerResultBlock.css';

const ResultBlock = props => {
  const roundTo2 = num => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  const percentCalc = (num1, num2) => {
    return Math.abs(100 - (num1 / num2) * 100);
  };

  const result = (num1, num2) => {
    const percent = percentCalc(num1, num2);
    let response = '';
    switch (true) {
      case percent === 0:
        response = "Well now you're just cheating...";
        break;
      case percent <= 10:
        response = 'Nice guess!';
        break;
      case percent >= 80:
        response = 'Err...';
        break;
      case percent >= 100:
        response = 'Really!?';
        break;
      default:
        response = 'It could have been worse.';
        break;
    }
    return (
      <div>
        <h2 className="ui header">
          {props.player} - {response}
        </h2>
        <p>You were {roundTo2(percent)}% out.</p>
      </div>
    );
  };

  return (
    <div className="ui results-block">
      {result(props.guessNum, props.subredditInfo.subscribers)}
    </div>
  );
};

export default ResultBlock;
