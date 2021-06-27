import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, FormControl, Grid, TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { createAccount } from 'actions/accountingAccounts';
import useStyles from 'styles/PopUpForms';

const types = {
  buy: 'out',
  sell: 'in',
  inv: 'inv',
};

const AddAccountingAccount = ({
  open, setOpen, type, accounts,
}) => {
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.accounting_accounts.show);
  const form = useRef();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const classes = useStyles();

  const closeHandler = () => {
    setOpen(!open);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(createAccount(formData, setErrors, closeHandler));
    form.current.reset();
  };

  const subcategories = [...new Set(accounts)];

  return (
    <>
      <form action="" className={classes.subForm} ref={form} onSubmit={submitHandler}>
        <input type="hidden" name="authenticity_token" value={auth} />
        <input type="hidden" name="accounting_account[category]" value={types[type]} />
        <h1 className={classes.title}>{labels.title[type]}</h1>
        <Grid container className={classes.gridContainer}>
          <FormControl className={classes.textFields} fullWidth>
            <TextField
              label={labels.name}
              name="accounting_account[name]"
              required
              error={errors ? !!errors.name : false}
              helperText={errors ? errors.name : null}
              placeholder={labels.name_info}
              autoComplete="off"
            />
          </FormControl>
          <FormControl className={classes.textFields} fullWidth>
            <Autocomplete
              options={subcategories}
              getOptionLabel={(option) => option}
              fullWidth
              renderInput={(params) => (
                <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                  {...params}
                  label={labels.category}
                  name="accounting_account[subcategory]"
                  required
                />
              )}
              required
              freeSolo
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
    </>
  );
};

AddAccountingAccount.propTypes = {
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  setOpen: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddAccountingAccount;
