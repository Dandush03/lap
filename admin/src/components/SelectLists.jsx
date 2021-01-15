import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Autocomplete } from '@material-ui/lab';
import {
  Button, TextField,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    minWidth: '32px',
    color: 'gray',
    padding: '0',
  },
  backdrop: {
    zIndex: '10',
    paddingLeft: '240px',
    height: '100%',
  },
}));

const SelectLists = ({
  disabled, options, inputname, label, required, passRef, addForm, setAddForm,
}) => {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const handleChange = (event, newEvent) => {
    if (newEvent) {
      setState(newEvent.id);
    } else {
      setState(null);
    }
  };

  const clickHandler = () => {
    setAddForm(!addForm);
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
          const newChilds = [...endAdornment.props.children, setAddForm ? addBtn : null];
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
  addForm: PropTypes.bool,
  setAddForm: PropTypes.func,
};

SelectLists.defaultProps = {
  disabled: false,
  required: false,
  passRef: null,
  addForm: null,
  setAddForm: null,
};

export default SelectLists;
