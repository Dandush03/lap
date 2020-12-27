import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Divider, FormControl, FormHelperText, Grid, TextField,
} from '@material-ui/core';

import changeInputToUppercase from './changeInputToUppercase';
import RadioBtnsField from './_RadioBtnsField';
import useStyles from './styles';

const NewArticle = ({ auth, labels, errors }) => {
  const classes = useStyles();
  return (
    <form
      method="post"
      action="/es/lap/articles/"
      acceptCharset="UTF-8"
      className={classes.root}
    >
      <input type="hidden" name="authenticity_token" value={auth} />
      <Divider />
      <Grid container className={classes.gridContainer}>
        <Grid item className={classes.gridItem} md={7} sm={12}>
          <RadioBtnsField inputs={labels.type} tagName="article" />
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.name}
              name="article[name]"
              error={errors ? !!errors.name : false}
              helperText={errors ? errors.name : null}
            />
          </FormControl>
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.sku}
              name="article[sku]"
              error={errors ? !!errors.sku : false}
              helperText={errors ? errors.sku : null}
              onChange={changeInputToUppercase}
            />
            <FormHelperText id="my-helper-text">{labels.sku_code}</FormHelperText>
          </FormControl>
          <FormControl className={classes.textFields}>
            <TextField
              label={labels.upc}
              name="article[upc]"
              error={errors ? !!errors.upc : false}
              helperText={errors ? errors.upc : null}
              onChange={changeInputToUppercase}
            />
            <FormHelperText id="my-helper-text">{labels.upc_code}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          foto
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
  errors: PropTypes.objectOf(PropTypes.object),
};

NewArticle.defaultProps = {
  errors: null,
};

export default NewArticle;
