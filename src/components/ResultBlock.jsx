import React, { useEffect, useState } from 'react';

import './ResultBlock.css';
import guesses from '../api/guesses';
import resultCopy from '../data/resultCopy';

const ResultBlock = (props) => {
  const { subredditInfo, guessNum } = props;
  const { subscribers } = subredditInfo;

  const [resultText, setResultText] = useState('');
  const [percent, setPercent] = useState('');
  const [average, setAverage] = useState('');

  const roundTo2 = (num) => +`${Math.round(`${num}e+2`)}e-2`;


  const numberFormat = (num) => num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  const averageRender = () => {
    if (average && average !== percent && !Number.isNaN(average)) {
      return (
        <p>
          {`The average guess for this subreddit is ${average}% out.`}
        </p>
      );
    }
    return null;
  };

  useEffect(() => {
    const averageResultPercentage = async () => {
      const averageResponse = await guesses.get(
        `/average/${subredditInfo.display_name}`,
      );
      if (averageResponse) {
        setAverage(averageResponse.data);
      }
    };
    averageResultPercentage();
    return () => {
      setAverage('');
    };
  }, [subredditInfo]);

  useEffect(() => {
    const percentCalc = (num1, num2) => roundTo2(Math.abs(100 - (num1 / num2) * 100)).toString();

    const percentCalced = percentCalc(guessNum, subscribers);
    setPercent(percentCalced);
    let resultPercentSelected;
    const percentRange = Object.keys(resultCopy).sort((a, b) => b - a);
    percentRange.forEach((resultPercent) => {
      if (parseFloat(resultPercent) >= parseFloat(percentCalced)) {
        resultPercentSelected = parseInt(resultPercent, 10);
      }
    });
    const copySelection = Math.floor(
      Math.random() * (resultCopy[resultPercentSelected].length),
    );
    setResultText(resultCopy[resultPercentSelected][copySelection].toLowerCase());
  }, [guessNum, subscribers]);

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
            /r/
            {subredditInfo.display_name}
          </a>
          {' '}
          has
          {' '}
          {numberFormat(subredditInfo.subscribers)}
          {' '}
          subscribers.
          {' '}
        </h3>
        <p>
          {`You were ${percent}% out.`}
        </p>
        {averageRender()}
      </div>
    </div>
  );
};

export default ResultBlock;
