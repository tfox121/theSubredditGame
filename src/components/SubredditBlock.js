import React from 'react';

import './SubredditBlock.css';

const SubredditBlock = props => {
  return (
    <div className="ui subreddit-block">
      <h2 className="ui header">/r/{props.subredditInfo.display_name}</h2>
      <p>{props.subredditInfo.public_description}</p>
    </div>
  );
};

export default SubredditBlock;
