import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Divider, Grid,
} from '@material-ui/core';

import useStyles from './styles';
import ArticleImage from './partials/ArticleImage';
import ArticleInformation from './partials/ArticleInformation';
import SellInformation from './partials/SellInformation';
import BuyInformation from './partials/BuyInformation';

const NewArticle = ({
  auth, labels, errors, sell_accounts: sellAccounts,
  taxes, buy_accounts: buyAccounts,
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
          taxes={taxes}
          classes={classes}
        />
        <Divider orientation="vertical" flexItem />
        <BuyInformation
          labels={labels}
          errors={errors}
          buyAccounts={buyAccounts}
          taxes={taxes}
          classes={classes}
        />
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
  taxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  buy_accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NewArticle.defaultProps = {
  errors: null,
};

export default NewArticle;
