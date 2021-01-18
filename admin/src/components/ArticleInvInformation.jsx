import React, { useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField,
} from '@material-ui/core';

import SelectLists from './SelectLists';
import { currencyHandler } from '../javascripts/inputFunctions';

const InvInformation = ({
  labels, errors, invAccounts, classes, addForm, setAddForm,
}) => {
  const sellInfoInput = useRef(null);
  const account = useRef(null);
  const openQty = useRef(null);
  const openQtyVal = useRef(null);

  const [checkedInvInfo, setCheckedInvInfo] = useState();

  const sellInfoHandler = async () => {
    if (!checkedInvInfo) return setCheckedInvInfo(!checkedInvInfo);

    openQty.current.value = '';
    openQtyVal.current.value = '';
    account.current.getElementsByTagName('button')[0].click();
    return setCheckedInvInfo(!checkedInvInfo);
  };

  return (
    <Grid className={classes.invInfo}>
      <FormGroup className={classes.textFields}>
        <FormControlLabel
          control={(
            <Checkbox
              name={labels.inv_item}
              color="primary"
              onChange={sellInfoHandler}
            />
            )}
          label={labels.inv_item}
        />
        <input
          type="hidden"
          name="article[inventory]"
          value={checkedInvInfo ? 1 : 0}
          ref={sellInfoInput}
        />
      </FormGroup>
      { checkedInvInfo
        ? (
          <>
            <FormControl className={classes.invInfoGroup}>
              <SelectLists
                passRef={account}
                options={invAccounts}
                required
                inputname="article[inv_account_id]"
                label={labels.inv_account}
                disabled={!checkedInvInfo}
                addForm={addForm}
                setAddForm={setAddForm}
              />
            </FormControl>
            <FormGroup className={classes.invInfoGroup}>
              <FormControl className={classes.textFields}>
                <TextField
                  disabled={!checkedInvInfo}
                  label={labels.open_qty_value}
                  name="article[open_qty_value]"
                  required
                  inputProps={{ ref: openQty }}
                  error={errors ? !!errors.sell_price : false}
                  helperText={errors ? errors.sell_price : null}
                  onKeyDownCapture={currencyHandler}
                  placeholder="0.00"
                />
              </FormControl>
              <FormControl className={classes.textFields}>
                <TextField
                  disabled={!checkedInvInfo}
                  label={labels.open_qty}
                  name="article[open_qty]"
                  required
                  inputProps={{ ref: openQtyVal }}
                  error={errors ? !!errors.sell_price : false}
                  helperText={errors ? errors.sell_price : null}
                />
              </FormControl>
            </FormGroup>
          </>
        ) : null}
    </Grid>
  );
};

InvInformation.propTypes = {
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  invAccounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  addForm: PropTypes.bool,
  setAddForm: PropTypes.func,
};

InvInformation.defaultProps = {
  errors: null,
  addForm: false,
  setAddForm: null,
};

export default InvInformation;
