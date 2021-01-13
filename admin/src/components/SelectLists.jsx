import React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import { Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '32px',
    color: 'gray',
    padding: '0',
  },
}));

const SelectLists = ({
  disabled, options, inputname, label, required, passRef, action,
}) => {
  const classes = useStyles();

  const [state, setState] = React.useState(null);
  const handleChange = (event, newEvent) => {
    if (newEvent) {
      setState(newEvent.id);
    } else {
      setState(null);
    }
  };

  const clickHandler = () => {
    action(true);
  };

  const addBtn = React.createElement(Button,
    {
      key: 'add-butn',
      className: classes.root,
      disabled,
      onClick: clickHandler,
    }, <AddIcon />);

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
        renderInput={(params) => {
          const { InputProps: { endAdornment } } = params;
          const newChilds = [...endAdornment.props.children, addBtn];
          return (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              required={required}
              label={label}
              InputProps={{
                ...params.InputProps,
                endAdornment: {
                  ...endAdornment,
                  props: { ...endAdornment.props, children: newChilds },
                },
              }}
            />
          );
        }}
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
  passRef: PropTypes.objectOf(PropTypes.object),
  action: PropTypes.func.isRequired,
};

SelectLists.defaultProps = {
  disabled: false,
  required: false,
  passRef: null,
};

export default SelectLists;
