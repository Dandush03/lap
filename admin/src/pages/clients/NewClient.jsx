import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Backdrop,
  Button,
  CircularProgress,
  Divider, Grid,
} from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles/article';
import createArticle from '../../actions/article';
import ClientInformation from '../../components/ClientInformation';
import ClientImage from '../../components/ClientImage';

const NewClient = ({ match, history }) => {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.fetching);
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.clients.new);

  const classes = useStyles();
  const form = useRef(null);
  const { locale } = match.params;

  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(createArticle(formData, setErrors, history)); // change to create client
  };

  useEffect(() => {
  }, []);

  return (
    <>
      <h1 className={classes.mainTitle}>{labels.title}</h1>
      <Backdrop className={classes.backdrop} open={!!fetching}>
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
          <ClientInformation labels={labels} errors={errors} classes={classes} />
          <ClientImage classes={classes} labels={labels} />
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

NewClient.propTypes = {
  match: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default NewClient;
