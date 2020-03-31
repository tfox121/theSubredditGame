import React, { useEffect, useState } from 'react';

import './ResultBlock.css';
import resultCopy from '../data/resultCopy';

const ResultBlock = props => {
  const { subredditInfo } = props;

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
    const percent = percentCalc(props.guessNum, subredditInfo.subscribers);
    setPercent(percent);
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
    <div className="ui basic segment results-block">
      <div>
        <h2 className="ui header">{resultText}</h2>
        <h3 className="ui header">
          <a
            href={`https://reddit.com${subredditInfo.url}`}
            className="sub-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            /r/{subredditInfo.display_name}
          </a>{' '}
          has {numberFormat(subredditInfo.subscribers)} subscribers.{' '}
        </h3>
        <p>You were {roundTo2(percent)}% out.</p>
      </div>
    </div>
  );
};

export default ResultBlock;
