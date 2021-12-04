import React, { useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField,
} from '@material-ui/core';

import SelectLists from 'shared-components/SelectLists';
import { currencyHandler } from 'javascripts/inputFunctions';

const BuyInformation = ({
  labels, errors, buyAccounts, taxes, classes, addForm, setAddForm,
}) => {
  const buyInfoInput = useRef(null);
  const price = useRef(null);
  const account = useRef(null);
  const description = useRef(null);
  const tax = useRef(null);

  const [checkedBuyInfo, setCheckedBuyInfo] = useState();

  const buyInfoHandler = async () => {
    if (!checkedBuyInfo) return setCheckedBuyInfo(!checkedBuyInfo);

    price.current.value = '';
    description.current.value = '';
    account.current.getElementsByTagName('button')[0].click();
    tax.current.getElementsByTagName('button')[0].click();
    return setCheckedBuyInfo(!checkedBuyInfo);
  };

  return (
    <Grid item sm={6} xs={12} className={classes.info}>
      <FormGroup className={classes.textFields}>
        <FormControlLabel
          control={(
            <Checkbox
              name={labels.buy_item}
              color="primary"
              onChange={buyInfoHandler}
            />
            )}
          label={labels.buy_item}
        />
        <input
          type="hidden"
          name="article[buy_item]"
          value={checkedBuyInfo ? 1 : 0}
          ref={buyInfoInput}
        />
      </FormGroup>
      <FormControl className={classes.textFields}>
        <TextField
          disabled={!checkedBuyInfo}
          label={labels.buy_price}
          name="article[buy_price]"
          required={checkedBuyInfo}
          inputProps={{ ref: price }}
          error={errors ? !!errors.buy_price : false}
          helperText={errors ? errors.buy_price : null}
          onKeyDownCapture={currencyHandler}
          placeholder="0.00"
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <SelectLists
          passRef={account}
          required={checkedBuyInfo}
          options={buyAccounts}
          inputname="article[buy_account_id]"
          label={labels.buy_accounts}
          disabled={!checkedBuyInfo}
          addForm={addForm}
          setAddForm={setAddForm}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <TextField
          inputname="article[buy_description]"
          inputProps={{ ref: description }}
          disabled={!checkedBuyInfo}
          label={labels.buy_description}
          multiline
          rows={4}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <SelectLists
          passRef={tax}
          options={taxes.map((obj) => ({ name: `${obj.name} [${obj.value * 100}%]`, id: obj.id }))}
          inputname="article[buy_account_tax_id]"
          label={labels.taxes}
          disabled={!checkedBuyInfo}
        />
      </FormControl>
    </Grid>
  );
};

BuyInformation.propTypes = {
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  buyAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  taxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  addForm: PropTypes.bool,
  setAddForm: PropTypes.func,
};

BuyInformation.defaultProps = {
  errors: null,
  addForm: false,
  setAddForm: null,
};

export default BuyInformation;
