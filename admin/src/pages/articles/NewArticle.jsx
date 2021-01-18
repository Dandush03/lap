import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Backdrop,
  CircularProgress,
  Divider, FormControl, Grid,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles/article';
import ArticleImage from '../../components/ArticleImage';
import ArticleInformation from '../../components/ArticleInformation';
import SellInformation from '../../components/ArticleSellInformation';
import BuyInformation from '../../components/ArticleBuyInformation';
import InvInformation from '../../components/ArticleInvInformation';
import SelectLists from '../../components/SelectLists';
import { getAccounts } from '../../actions/accountingAccounts';
import { getArticleGroups } from '../../actions/articleGroups';
import AddArticleGroup from '../../containers/AddArticleGroup';
import AddAccountingAccount from '../../containers/AddAccountingAccount';

const NewArticle = ({
  errors,
  taxes,
  match,
}) => {
  const fetching = useSelector((state) => state.fetching);
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.articles.new);
  const accounts = useSelector((state) => state.accountingAccounts);
  const articlesGroups = useSelector((state) => state.articlesGroups);
  const classes = useStyles();
  const { locale } = match.params;

  const [groupArticle, setGroupArticle] = useState(false);
  const [sellAccount, setSellAccount] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (accounts.buy.length === 0) dispatch(getAccounts());
    if (articlesGroups.length === 0) dispatch(getArticleGroups());
  }, []);

  return (
    <>
      <Backdrop className={classes.backdrop} open={groupArticle}>
        <AddArticleGroup
          open={groupArticle}
          setOpen={setGroupArticle}
          classes={classes}
          groups={articlesGroups}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={sellAccount}>
        <AddAccountingAccount
          open={sellAccount}
          setOpen={setSellAccount}
          classes={classes}
          groups={articlesGroups}
          type="sell"
          accounts={accounts.sell.map((obj) => obj.subcategory)}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={!!fetching}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
              options={articlesGroups}
              required
              inputname="article[articles_group_id]"
              label={labels.article_group}
              addForm={groupArticle}
              setAddForm={setGroupArticle}
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
            sellAccounts={accounts.sell}
            taxes={taxes}
            classes={classes}
            addForm={sellAccount}
            setAddForm={setSellAccount}
          />
          <Divider orientation="vertical" flexItem />
          <BuyInformation
            labels={labels}
            errors={errors}
            buyAccounts={accounts.buy}
            taxes={taxes}
            classes={classes}
          />
        </Grid>
        <Divider />
        <Grid container className={classes.gridContainer}>
          <InvInformation
            labels={labels}
            errors={errors}
            invAccounts={accounts.inv}
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
  errors: PropTypes.objectOf(PropTypes.array),
  taxes: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

NewArticle.defaultProps = {
  errors: null,
  taxes: [],
};

export default NewArticle;
