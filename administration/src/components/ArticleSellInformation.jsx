import React, { useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Checkbox, FormControl, FormControlLabel, FormGroup, Grid, InputAdornment, TextField,
} from '@material-ui/core';

import SelectLists from './SelectLists';
import { currencyHandler, onlyNumber } from '../javascripts/inputFunctions';

const SellInformation = ({
  labels, errors, sellAccounts, taxes, classes, addForm, setAddForm, currency,
}) => {
  const sellInfoInput = useRef(null);
  const price = useRef(null);
  const account = useRef(null);
  const description = useRef(null);
  const tax = useRef(null);

  const [checkedSellInfo, setCheckedSellInfo] = useState();
  const [convertion, setConvertion] = useState('0.00');

  const sellInfoHandler = async () => {
    if (!checkedSellInfo) return setCheckedSellInfo(!checkedSellInfo);

    price.current.value = '';
    description.current.value = '';
    account.current.getElementsByTagName('button')[0].click();
    tax.current.getElementsByTagName('button')[0].click();
    return setCheckedSellInfo(!checkedSellInfo);
  };

  const convertCurrencyHandler = (e) => {
    currencyHandler(e);
    setConvertion(e.target.value);
  };

  return (
    <Grid item sm={6} xs={12} className={classes.info}>
      <FormGroup className={classes.textFields}>
        <FormControlLabel
          control={(
            <Checkbox
              name={labels.sell_item}
              color="primary"
              onChange={sellInfoHandler}
            />
            )}
          label={labels.sell_item}
        />
        <input
          type="hidden"
          name="article[sell_item]"
          value={checkedSellInfo ? 1 : 0}
          ref={sellInfoInput}
        />
      </FormGroup>
      <FormControl className={classes.textFields}>
        <TextField
          disabled={!checkedSellInfo}
          label={labels.sell_price}
          name="article[sell_price]"
          required={checkedSellInfo}
          InputProps={
            {
              ref: price,
              startAdornment: <InputAdornment position="start">{currency.base.symbol}</InputAdornment>,
              endAdornment: <InputAdornment position="end">{currency.base.code}</InputAdornment>,
            }
          }
          error={errors ? !!errors.sell_price : false}
          helperText={errors ? errors.sell_price : `${currency.secondary.symbol} ${convertion || '0.00'} ${currency.secondary.code}`}
          onKeyUpCapture={convertCurrencyHandler}
          onKeyDownCapture={onlyNumber}
          placeholder="0.00"
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <SelectLists
          passRef={account}
          required={checkedSellInfo}
          options={sellAccounts}
          inputname="article[sell_account_id]"
          label={labels.sell_accounts}
          disabled={!checkedSellInfo}
          addForm={addForm}
          setAddForm={setAddForm}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <TextField
          inputname="article[sell_description]"
          inputProps={{ ref: description }}
          disabled={!checkedSellInfo}
          label={labels.sell_description}
          multiline
          rows={4}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <SelectLists
          passRef={tax}
          options={taxes.map((obj) => ({ name: `${obj.name} [${obj.value * 100}%]`, id: obj.id }))}
          inputname="article[sell_account_tax_id]"
          label={labels.taxes}
          disabled={!checkedSellInfo}
        />
      </FormControl>
    </Grid>
  );
};

SellInformation.propTypes = {
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  sellAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  taxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.objectOf(PropTypes.object),
  addForm: PropTypes.bool,
  setAddForm: PropTypes.func,
};

SellInformation.defaultProps = {
  errors: null,
  addForm: false,
  setAddForm: null,
  currency: { base: {}, secondary: {} },
};

export default SellInformation;
