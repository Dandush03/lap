import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const SelectLists = ({
  disabled, options, inputname, label, required, passRef,
}) => {
  const [state, setState] = React.useState(null);

  const handleChange = (event, newEvent) => {
    if (newEvent) {
      setState(newEvent.id);
    } else {
      setState(null);
    }
  };

  return (
    <>
      {state ? <input type="hidden" name={inputname} value={state} /> : null}
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name}
        getOptionSelected={(option) => option.id}
        groupBy={(option) => option.subcategory}
        onChange={handleChange}
        disabled={disabled}
        ref={passRef}
        fullWidth
        renderInput={(params) => (
          <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            required={required}
            label={label}
          />
        )}
      />
    </>

  );
};

SelectLists.propTypes = {
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  inputname: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  passRef: PropTypes.objectOf(PropTypes.object).isRequired,
};

SelectLists.defaultProps = {
  disabled: true,
  required: false,
};

export default SelectLists;
