import React, { useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField,
} from '@material-ui/core';

import SelectLists from '../../shared/SelectLists';
import { currencyHandler } from '../inputFunctions';

const SellInformation = ({
  labels, errors, sellAccounts, sellAccountsTaxes, classes,
}) => {
  const sellInfoInput = useRef(null);
  const price = useRef(null);
  const account = useRef(null);
  const description = useRef(null);
  const tax = useRef(null);

  const [checkedSellInfo, setCheckedSellInfo] = useState();

  const sellInfoHandler = async () => {
    if (!checkedSellInfo) return setCheckedSellInfo(!checkedSellInfo);

    price.current.value = '';
    description.current.value = '';
    account.current.getElementsByTagName('button')[0].click();
    tax.current.getElementsByTagName('button')[0].click();
    return setCheckedSellInfo(!checkedSellInfo);
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
          inputProps={{ ref: price }}
          error={errors ? !!errors.sell_price : false}
          helperText={errors ? errors.sell_price : null}
          onKeyDownCapture={currencyHandler}
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
          options={sellAccountsTaxes.map((obj) => ({ name: `${obj.name} [${obj.value * 100}%]`, id: obj.id }))}
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
  sellAccountsTaxes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

SellInformation.defaultProps = {
  errors: null,
};

export default SellInformation;
