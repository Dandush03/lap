import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  FormControl, Grid, TextField,
} from '@material-ui/core';

import {
  changeInputToUppercase, dragEnterHandler, insertSpaceAndValidateNumber,
} from '../javascripts/inputFunctions';
import RadioBtnsField from './RadioBtnsField';

const ArticleInformation = ({
  labels, errors, classes,
}) => {
  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
  }, []);

  return (
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
  );
};

ArticleInformation.propTypes = {
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
};

ArticleInformation.defaultProps = {
  errors: null,
};

export default ArticleInformation;
