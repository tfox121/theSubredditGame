import React from 'react';

import './ResultBlock.css';

class ResultBlock extends React.Component {
  numberFormat = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  roundTo2 = num => {
    return +(Math.round(num + 'e+2') + 'e-2');
  };

  percentCalc = (num1, num2) => {
    return Math.abs(100 - (num1 / num2) * 100);
  };

  result = percent => {
    let header = '';
    switch (true) {
      case percent === 0:
        header = "Well now you're just cheating...";
        break;
      case percent <= 10:
        header = 'Nice guess!';
        break;
      case percent >= 80:
        header = 'Err...';
        break;
      case percent >= 100:
        header = 'Really!?';
        break;
      default:
        header = 'It could have been worse.';
        break;
    }
    return (
      <div>
        <h2 className="ui header">{header}</h2>
        <p>You were {this.roundTo2(percent)}% out.</p>
      </div>
    );
  };

  render() {
    return (
      <div className="ui results-block">
        {this.result(
          this.percentCalc(
            this.props.guessNum,
            this.props.subredditInfo.subscribers
          )
        )}
      </div>
    );
  }
}

export default ResultBlock;
