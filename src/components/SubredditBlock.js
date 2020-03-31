import React from 'react';
import decode from 'unescape';

import './SubredditBlock.css';

import TopPostBlock from './TopPostBlock';

const SubredditBlock = props => {
  const { subredditInfo } = props;

  const titleRender = () => {
    if (
      subredditInfo.title &&
      subredditInfo.title !== subredditInfo.display_name
    ) {
      return <h5 className="ui header">{decode(subredditInfo.title)}</h5>;
    }
  };

  const descriptionRender = () => {
    if (subredditInfo.public_description) {
      return <p>{decode(subredditInfo.public_description)}</p>;
    }
  };

  const imageRender = () => {
    if (subredditInfo.header_img) {
      return (
        <div className="sub-header-img-block">
          <img
            className="sub-header-img"
            src={subredditInfo.header_img}
            alt="subreddit "
          />
        </div>
      );
    }
  };

  return (
    <div className="ui subreddit-block">
      <h2 className="ui header">{subredditInfo.display_name_prefixed}</h2>
      {titleRender()}
      {descriptionRender()}
      {imageRender()}
      <TopPostBlock subredditInfo={subredditInfo} />
    </div>
  );
};

export default SubredditBlock;
