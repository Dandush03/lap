import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Drawer, FormControl, Grid, InputAdornment, TextField,
} from '@material-ui/core';
import createExchange from '../actions/exchanges';
import useStyles from '../styles/PopUpForms';
import { currencyHandler, onlyNumber } from '../javascripts/inputFunctions';

const AddExchangeRate = ({
  open, isOpen,
}) => {
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.exchanges.new);
  const company = useSelector((state) => state.company);
  const form = useRef();
  const valueInput = useRef();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const classes = useStyles();

  const closeHandler = () => {
    open(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);

    formData.set('exchange[value]', valueInput.current.value.replace(/,/g, '_'));
    dispatch(createExchange(formData, setErrors, closeHandler));
    form.current.reset();
  };

  const { currency: { secondary, base }, id } = company;

  return (
    <Drawer
      open={isOpen}
      classes={{
        paper: classes.exchange,
      }}
      onClose={closeHandler}
    >
      <form action="" className={classes.subForm} ref={form} onSubmit={submitHandler}>
        <input type="hidden" name="authenticity_token" value={auth} />
        <input type="hidden" name="exchange[base_currency_id]" value={base.id} />
        <input type="hidden" name="exchange[company_id]" value={id} />
        <input type="hidden" name="exchange[secondary_currency_id]" value={secondary.id} />
        <h1 className={classes.title}>{labels.title}</h1>
        <Grid container className={classes.gridContainer}>
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.value}
              required
              error={errors ? !!errors.value : false}
              helperText={errors ? errors.value : labels.value_info}
              autoComplete="off"
              onKeyUpCapture={currencyHandler}
              onKeyDownCapture={onlyNumber}
              name="exchange[value]"
              placeholder="0.00"
              inputRef={valueInput}
              InputProps={
                {
                  startAdornment: <InputAdornment position="start">{secondary.symbol}</InputAdornment>,
                  endAdornment: <InputAdornment position="end">{secondary.code}</InputAdornment>,
                }
              }
            />
          </FormControl>
        </Grid>
        <Grid container className={classes.btnContainers}>
          <Button variant="contained" color="primary" type="submit">
            {labels.save}
          </Button>
          <Button variant="contained" color="secondary" onClick={closeHandler}>
            {labels.cancel}
          </Button>
        </Grid>
      </form>
    </Drawer>
  );
};

AddExchangeRate.propTypes = {
  open: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

export default AddExchangeRate;
