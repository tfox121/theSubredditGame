import React from 'react';
import { Slider } from 'react-semantic-ui-range';
import { Label, Grid } from 'semantic-ui-react';

import './NsfwSlider.css';

function NsfwSlider({ width, nsfw, onChange }) {
  const settings = {
    start: 0,
    min: 0,
    max: 2,
    step: 1,
    onChange: (value) => {
      onChange(value);
    },
  };

  const sliderText = (value) => {
    let text = 'fingers crossed.';
    if (value === 1) {
      text = 'spicing it up...';
    }
    if (value === 2) {
      text = 'dicks. dicks everywhere.';
    }
    return text;
  };

  const sliderColor = (value) => {
    let color = 'green';
    if (value === 1) {
      color = 'orange';
    }
    if (value === 2) {
      color = 'red';
    }
    return color;
  };

  const renderSlider = () => (
    <div className="inline field">
      <Grid className="slider">
        <Grid.Column width={width}>
          <Slider
            discrete
            value={nsfw}
            color="black"
            settings={settings}
          />
        </Grid.Column>
        <Grid.Column width={width} className="slider-text">
          <Label color={sliderColor(nsfw)}>
            NSFW level:
            {' '}
            {sliderText(nsfw)}
          </Label>
        </Grid.Column>
      </Grid>
    </div>
  );

  return <div>{renderSlider()}</div>;
}

export default NsfwSlider;
