import React from 'react';
import decode from 'unescape';

import './SubredditBlock.css';

const SubredditBlock = props => {
  const titleRender = () => {
    if (
      props.subredditInfo.title &&
      props.subredditInfo.title !== props.subredditInfo.display_name
    ) {
      return <h5 classname="ui header">{decode(props.subredditInfo.title)}</h5>;
    }
  };

  const descriptionRender = () => {
    if (props.subredditInfo.public_description) {
      return <p>{decode(props.subredditInfo.public_description)}</p>;
    }
  };

  const imageRender = () => {
    if (props.subredditInfo.header_img) {
      return <img src={props.subredditInfo.header_img} alt="subreddit " />;
    }
  };

  return (
    <div className="ui subreddit-block">
      <h2 className="ui header">{props.subredditInfo.display_name_prefixed}</h2>
      {titleRender()}
      {descriptionRender()}
      {imageRender()}
    </div>
  );
};

export default SubredditBlock;
