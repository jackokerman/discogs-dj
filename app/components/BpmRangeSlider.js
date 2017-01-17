import React from 'react';
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

const BpmRangeSlider = (props) => {
  const { value, min, max, onChange } = props;
  const display = `${value[0]} - ${value[1]}`;
  return (
    <div className="bpm-range-slider">
      <div className="bpm-label">BPM</div>
      <div className="bpm-display">{display}</div>
      <div className="slider-container">
        <Slider
          range
          value={value}
          min={min}
          max={max}
          allowCross={false}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

BpmRangeSlider.propTypes = {
  value: React.PropTypes.array.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
};

export default BpmRangeSlider;
