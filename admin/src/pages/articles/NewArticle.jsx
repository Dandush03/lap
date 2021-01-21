import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Backdrop,
  Button,
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
import createArticle from '../../actions/article';
import getTaxes from '../../actions/taxes';

const NewArticle = ({ match, history }) => {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.fetching);
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.articles.new);
  const accounts = useSelector((state) => state.accountingAccounts);
  const articlesGroups = useSelector((state) => state.articlesGroups);
  const taxes = useSelector((state) => state.taxes);

  const classes = useStyles();
  const form = useRef(null);
  const { locale } = match.params;

  const [errors, setErrors] = useState(null);
  const [groupArticle, setGroupArticle] = useState(false);
  const [sellAccount, setSellAccount] = useState(false);
  const [buyAccount, setBuyAccount] = useState(false);
  const [invAccount, setInvAccount] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(createArticle(formData, setErrors, history));
  };

  useEffect(() => {
    if (accounts.buy.length === 0) dispatch(getAccounts());
    if (articlesGroups.length === 0) dispatch(getArticleGroups());
    if (taxes.length === 0) dispatch(getTaxes());
  }, []);

  return (
    <>
      <h1 className={classes.mainTitle}>{labels.title}</h1>
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
      <Backdrop className={classes.backdrop} open={buyAccount}>
        <AddAccountingAccount
          open={buyAccount}
          setOpen={setBuyAccount}
          classes={classes}
          groups={articlesGroups}
          type="buy"
          accounts={accounts.buy.map((obj) => obj.subcategory)}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={invAccount}>
        <AddAccountingAccount
          open={invAccount}
          setOpen={setInvAccount}
          classes={classes}
          groups={articlesGroups}
          type="inv"
          accounts={accounts.inv.map((obj) => obj.subcategory)}
        />
      </Backdrop>
      <Backdrop className={classes.fetching} open={!!fetching}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form
        method="post"
        action={`/${locale}/articles/`}
        acceptCharset="UTF-8"
        className={classes.root}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        ref={form}
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
            addForm={buyAccount}
            setAddForm={setBuyAccount}
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
            addForm={invAccount}
            setAddForm={setInvAccount}
          />
        </Grid>
        <Divider />
        <Grid container className={classes.btnContainers} style={{ marginTop: '24px' }}>
          <Button variant="contained" color="primary" type="submit">
            {labels.submit}
          </Button>
        </Grid>
      </form>
    </>
  );
};

NewArticle.propTypes = {
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default NewArticle;
