import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import { Label, Grid } from 'semantic-ui-react';

import './NsfwSlider.css';

function NsfwSlider(props) {
  const settings = {
    start: 0,
    min: 0,
    max: 2,
    step: 1,
    onChange: value => {
      props.onChange(value);
    }
  };

  const sliderText = value => {
    let text = 'Fingers crossed.';
    if (value === 1) {
      text = 'Spicing it up...';
    }
    if (value === 2) {
      text = 'Dicks. Dicks everywhere.';
    }
    return text;
  };

  const sliderColor = value => {
    let color = 'green';
    if (value === 1) {
      color = 'orange';
    }
    if (value === 2) {
      color = 'red';
    }
    return color;
  };

  const renderSlider = () => {
    return (
      <div className="inline field">
        <Grid className="slider">
          <Grid.Column width={props.width}>
            <Slider
              discrete
              value={props.nsfw}
              color="black"
              settings={settings}
            />
          </Grid.Column>
          <Grid.Column width={props.width} className="slider-text">
            <Label color={sliderColor(props.nsfw)}>
              NSFW Level: {sliderText(props.nsfw)}
            </Label>
          </Grid.Column>
        </Grid>
      </div>
    );
  };

  return <div>{renderSlider()}</div>;
}

export default NsfwSlider;
