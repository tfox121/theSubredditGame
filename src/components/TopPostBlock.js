import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Divider, Image, Transition } from 'semantic-ui-react';

import placeholder from '../images/placeholder.PNG';
import './TopPostBlock.css';

const TopPostBlock = props => {
  const [visible, setVisible] = useState(false);
  const { topPost } = props.subredditInfo;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const addZoom = function(target) {
    // FETCH CONTAINER + IMAGE
    var container = document.getElementById(target);
    console.log(container);
    let imgsrc =
      container.currentStyle || window.getComputedStyle(container, false);
    imgsrc = container
      .getAttribute('src')
      .slice(4, -1)
      .replace(/"/g, '');
    let img = new Image();

    // LOAD IMAGE + ATTACH ZOOM
    img.src = imgsrc;
    img.onload = function() {
      let imgWidth = img.naturalWidth;
      let imgHeight = img.naturalHeight;
      let ratio = imgHeight / imgWidth;
      let percentage = ratio * 100 + '%';

      // ZOOM ON MOUSE MOVE
      container.onmousemove = function(e) {
        var boxWidth = container.clientWidth;
        let xPos = e.pageX - this.offsetLeft;
        let yPos = e.pageY - this.offsetTop;
        let xPercent = xPos / (boxWidth / 100) + '%';
        let yPercent = yPos / ((boxWidth * ratio) / 100) + '%';

        Object.assign(container.style, {
          backgroundPosition: xPercent + ' ' + yPercent,
          backgroundSize: imgWidth + 'px'
        });
      };

      // RESET ON MOUSE LEAVE
      container.onmouseleave = function(e) {
        Object.assign(container.style, {
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        });
      };
    };
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
            !topPost.thumbnail || topPost.thumbnail === 'self'
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
              <span className="top-post-title-domain">({topPost.domain})</span>
            </p>
            {previewImg && (
              <>
                <i onClick={toggleVisibility} class="camera icon"></i>
                <Divider hidden />
                <Transition
                  visible={visible}
                  animation="fade down"
                  duration={500}
                >
                  <div className="zoomOut">
                    <Image
                      // id="zoom-img"
                      className="zoomIn"
                      size="small"
                      src={previewImg}
                    />
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

const mapStateToProps = state => {
  return { multiplayer: state.multiplayer };
};

export default connect(mapStateToProps)(TopPostBlock);
