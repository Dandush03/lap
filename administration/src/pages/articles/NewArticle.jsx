import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Backdrop,
  Button,
  Divider, FormControl, Grid,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from 'styles/article';
import createArticle from 'actions/article';
import SelectLists from 'shared-components/SelectLists';
import AddGroup from 'shared-containers/AddGroup';
import AddAccountingAccount from 'shared-containers/AddAccountingAccount';
import Image from './components/Image';
import Information from './components/Information';
import SellInformation from './components/SellInformation';
import BuyInformation from './components/BuyInformation';
import InvInformation from './components/InvInformation';

const NewArticle = ({ history }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.articles.new);
  const accounts = useSelector((state) => state.accountingAccounts);
  const articlesGroups = useSelector((state) => state.articlesGroups);
  const taxes = useSelector((state) => state.taxes);
  const company = useSelector((state) => state.company);

  const classes = useStyles();
  const form = useRef(null);

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

  return (
    <>
      <Backdrop className={classes.backdrop} open={groupArticle}>
        <AddGroup
          open={groupArticle}
          setOpen={setGroupArticle}
          groups={articlesGroups}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={sellAccount}>
        <AddAccountingAccount
          open={sellAccount}
          setOpen={setSellAccount}
          groups={articlesGroups}
          type="sell"
          accounts={accounts.sell.map((obj) => obj.subcategory)}
        />
      </Backdrop>
      <Backdrop className={classes.backdrop} open={buyAccount}>
        <AddAccountingAccount
          open={buyAccount}
          setOpen={setBuyAccount}
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
      <form
        method="post"
        action="articles/"
        acceptCharset="UTF-8"
        className={classes.root}
        encType="multipart/form-data"
        onSubmit={handleSubmit}
        ref={form}
      >
        <h1 className={classes.mainTitle}>{labels.title}</h1>
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
          <Information labels={labels} errors={errors} classes={classes} />
          <Image classes={classes} labels={labels} />
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
            currency={company.currency}
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
            currencySymbol={company.currency ? company.currency.symbol : null}
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
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default NewArticle;