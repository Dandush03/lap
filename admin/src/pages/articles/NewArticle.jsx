import React, { useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Divider, FormControl, Grid,
} from '@material-ui/core';

import useStyles from '../../styles/article';
import ArticleImage from '../../components/ArticleImage';
import ArticleInformation from '../../components/ArticleInformation';
import SellInformation from '../../components/ArticleSellInformation';
import BuyInformation from '../../components/ArticleBuyInformation';
import InvInformation from '../../components/ArticleInvInformation';
import SelectLists from '../../components/SelectLists';

const NewArticle = ({
  auth, labels, errors, sell_accounts: sellAccounts,
  taxes, buy_accounts: buyAccounts, inv_accounts: invAccounts,
  articles_group: articleGroup, locale,
}) => {
  const classes = useStyles;
  const [groupForm, setGroupForm] = useState();

  console.log('====================================');
  console.log(groupForm);
  console.log('====================================');
  return (
    <>
      <form
        method="post"
        action={`/${locale}/articles/`}
        acceptCharset="UTF-8"
        className={classes.root}
        encType="multipart/form-data"
      >
        <input type="hidden" name="authenticity_token" value={auth} />
        <Divider />
        <Grid container className={classes.gridContainer}>
          <FormControl className={classes.textFields}>
            <SelectLists
              options={articleGroup}
              action={setGroupForm}
              required
              inputname="article[articles_group_id]"
              label={labels.article_group}
            />
          </FormControl>
        </Grid>
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
        <Grid container className={classes.gridContainer}>
          <InvInformation
            labels={labels}
            errors={errors}
            invAccounts={invAccounts}
            taxes={taxes}
            classes={classes}
          />
        </Grid>
        <Divider />
        <input type="submit" value="save" />
      </form>
    </>
  );
};

NewArticle.propTypes = {
  auth: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
  sell_accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  taxes: PropTypes.arrayOf(PropTypes.object).isRequired,
  buy_accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  inv_accounts: PropTypes.arrayOf(PropTypes.object).isRequired,
  articles_group: PropTypes.arrayOf(PropTypes.object).isRequired,
};

NewArticle.defaultProps = {
  errors: null,
};

export default NewArticle;
