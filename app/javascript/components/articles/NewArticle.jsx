import React, { useEffect, useRef, useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Checkbox,
  Divider, FormControl, FormControlLabel, FormGroup, Grid, Input, TextField,
} from '@material-ui/core';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import {
  changeInputToUppercase, dragEnterHandler, dragLeaveHandler,
  insertSpaceAndValidateNumber, dragEndHandler, changeImageHandler, currencyHandler,
} from './inputFunctions';
import RadioBtnsField from './_RadioBtnsField';
import useStyles from './styles';
import SelectLists from './_SelectLists';

const NewArticle = ({
  auth, labels, errors, sell_accounts: sellAccounts, sell_accounts_taxes: sellAccountsTaxes,
}) => {
  const sellInfoInput = useRef(null);
  const classes = useStyles();

  const [checkedSellInfo, setCheckedSellInfo] = useState();

  const sellInfoHandler = () => {
    setCheckedSellInfo(!checkedSellInfo);
  };

  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
  }, []);

  return (
    <form
      method="post"
      action="/es/articles/"
      acceptCharset="UTF-8"
      className={classes.root}
      encType="multipart/form-data"
    >
      <input type="hidden" name="authenticity_token" value={auth} />
      <Divider />
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.imageTextContainer} sm={7} xs={12}>
          <RadioBtnsField inputs={labels.type} tagName="article" />
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.name}
              name="article[name]"
              required
              error={errors ? !!errors.name : false}
              helperText={errors ? errors.name : null}
              placeholder={labels.name_info}
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.sku}
              name="article[sku]"
              required
              error={errors ? !!errors.sku : false}
              helperText={errors ? errors.sku : null}
              onChange={changeInputToUppercase}
              placeholder={labels.sku_code}
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.upc}
              name="article[upc]"
              error={errors ? !!errors.upc : false}
              helperText={errors ? errors.upc : null}
              onKeyDownCapture={insertSpaceAndValidateNumber}
              inputProps={{ maxLength: 15 }}
              placeholder={labels.upc_code}
            />
          </FormControl>
        </Grid>
        <Grid item className={classes.dropZoneContainer} sm={5} xs={12}>
          <Input
            type="file"
            id="file_uploader"
            name="article[picture]"
            onDragLeave={dragLeaveHandler}
            onDropCapture={dragEndHandler}
            onChange={changeImageHandler}
            className={classes.dropZone}
            inputProps={{ className: classes.dropZone }}
          />
          <div className={classes.dropZoneLabelContainer} id="file_label">
            <div className={classes.dropZoneLabel}>
              <img alt="Article" id="file_img" style={{ opacity: 0 }} className={classes.dropZoneImage} />
            </div>
            <div className={classes.dropZoneLabel}>
              <ImageSearchIcon color="disabled" fontSize="large" />
              <span>{labels.file_upload}</span>
            </div>
          </div>
        </Grid>
      </Grid>
      <Divider />
      <Grid container className={classes.gridContainer}>
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
              error={errors ? !!errors.sell_price : false}
              helperText={errors ? errors.sell_price : null}
              onKeyDownCapture={currencyHandler}
              placeholder="0.00"
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <SelectLists
              options={sellAccounts}
              inputname="article[sell_account_id]"
              label={labels.sell_accounts}
              disabled={!checkedSellInfo}
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <TextField
              inputname="article[sell_description]"
              label={labels.sell_description}
              multiline
              rows={4}
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <SelectLists
              options={sellAccountsTaxes.map((obj) => ({ name: `${obj.name} [${obj.value * 100}%]`, id: obj.id }))}
              inputname="article[sell_account_tax_id]"
              label={labels.taxes}
              disabled={!checkedSellInfo}
            />
          </FormControl>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item sm={6} xs={12} className={classes.sellInfo}>
          buy
        </Grid>
      </Grid>
      <Divider />

      <input type="submit" value="save" />
    </form>
  );
};

NewArticle.propTypes = {
  auth: PropTypes.string.isRequired,
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  sell_accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  sell_accounts_taxes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NewArticle.defaultProps = {
  errors: null,
};

export default NewArticle;
