import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Divider, Image, Transition } from 'semantic-ui-react';

import placeholder from '../images/placeholder.PNG';
import './TopPostBlock.css';

const TopPostBlock = ({ subredditInfo }) => {
  const [visible, setVisible] = useState(false);
  const { topPost } = subredditInfo;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  let previewImg;

  if (topPost.preview) {
    previewImg = topPost.preview.images[0].source.url;
  } else if (topPost.url.slice(-3) === 'jpg') {
    previewImg = topPost.url;
  }

  return (
    <div className="ui vertical segment">
      <div className="top-post">
        <img
          className="top-post-img"
          src={
            !topPost.thumbnail
              || topPost.thumbnail === 'self'
              || topPost.thumbnail === 'nsfw'
              || topPost.thumbnail === ''
              ? placeholder
              : topPost.thumbnail
          }
          alt="subreddit thumbnail"
        />
        <div>
          <div className="top-post-matter">
            <p className="top-post-title">
              <a
                href={topPost.url}
                className="top-post-title-link"
                rel="noopener noreferrer"
                target="_blank"
              >
                {topPost.title}
              </a>
              {'  '}
              <span className="top-post-title-domain">
                (
                {topPost.domain}
                )
              </span>
            </p>
            {previewImg && (
              <>
                <i
                  onClick={toggleVisibility}
                  onKeyDown={toggleVisibility}
                  className="camera icon"
                  role="button"
                  aria-label="Expand thumbnail"
                  tabIndex="0"
                />
                <Divider hidden />
                <Transition
                  visible={visible}
                  animation="fade down"
                  duration={500}
                >
                  <div className="zoomOut">
                    <Image className="zoomIn" size="small" src={previewImg} />
                  </div>
                </Transition>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ multiplayer: state.multiplayer });

export default connect(mapStateToProps)(TopPostBlock);
