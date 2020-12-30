import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Divider, FormControl, Grid, Input, TextField,
} from '@material-ui/core';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import {
  changeInputToUppercase, dragEnterHandler, dragLeaveHandler,
  insertSpaceAndValidateNumber, dragEndHandler, changeImageHandler,
} from './inputFunctions';
import RadioBtnsField from '../shared/RadioBtnsField';
import useStyles from './styles';
import SellInformation from './partials/SellInformation';
import ArticleImage from './partials/ArticleImage';
import ArticleInformation from './partials/ArticleInformation';

const NewArticle = ({
  auth, labels, errors, sell_accounts: sellAccounts, sell_accounts_taxes: sellAccountsTaxes,
}) => {
  const classes = useStyles();

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
        <ArticleInformation labels={labels} errors={errors} classes={classes} />
        <ArticleImage classes={classes} labels={labels} />
      </Grid>
      <Divider />
      <Grid container className={classes.gridContainer}>
        <SellInformation
          labels={labels}
          errors={errors}
          sellAccounts={sellAccounts}
          sellAccountsTaxes={sellAccountsTaxes}
          classes={classes}
        />
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
