import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  FormControl, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup,
} from '@material-ui/core';

const RadioBtnsField = ({ inputs, tagName }) => {
  const inputArr = [];
  Object.keys(inputs).forEach((key) => {
    if (key !== 'caption') { inputArr.push(key); }
  });

  const [value, setValue] = React.useState(inputArr[0]);
  const objState = Object.fromEntries(
    inputArr.map((el) => [el, el === value]),
  );

  const [state, setState] = useState(objState);

  const handleChange = (event) => {
    setValue(event.target.value);

    const newObjState = Object.fromEntries(
      inputArr.map((el) => [el, el === event.target.value]),
    );

    setState(newObjState);
  };

  const option = inputArr.map((n) => (
    <FormControlLabel
      control={<Radio />}
      value={n}
      name={tagName ? `${tagName}[${n}]` : n}
      label={inputs[n]}
      labelPlacement="end"
      key={n}
    />
  ));

  const hiddenValues = inputArr.map((n) => {
    const el = n;
    return (
      <input type="hidden" name={tagName ? `${tagName}[${el}]` : el} value={state[el]} key={n} />
    );
  });

  return (
    <FormGroup>
      <FormControl component="fieldset">
        <FormLabel component="legend">{inputs.caption}</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} row>
          {option}
          {hiddenValues}
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
};

RadioBtnsField.propTypes = {
  inputs: PropTypes.objectOf(PropTypes.string).isRequired,
  tagName: PropTypes.string,
};

RadioBtnsField.defaultProps = {
  tagName: null,
};

export default RadioBtnsField;
