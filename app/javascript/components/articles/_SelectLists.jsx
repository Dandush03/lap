import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';

const SelectLists = ({
  disabled, options, inputname, label,
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
        fullWidth
        renderInput={(params) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
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
};

SelectLists.defaultProps = {
  disabled: true,
};

export default SelectLists;
