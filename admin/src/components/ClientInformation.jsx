import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  FormControl, Grid, TextField,
} from '@material-ui/core';

import {
  dragEnterHandler, insertSpaceAndValidateNumber,
} from '../javascripts/inputFunctions';

const ClientInformation = ({
  labels, errors, classes,
}) => {
  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
  }, []);

  return (
    <Grid item className={classes.imageTextContainer} sm={7} xs={12}>
      <FormControl className={classes.textFields}>
        <TextField
          label={labels.company_id}
          name="client[company_id]"
          required
          error={errors ? !!errors.company_id : false}
          helperText={errors ? errors.company_id : null}
          placeholder={labels.company_id_info}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <TextField
          label={labels.name}
          name="client[name]"
          required
          error={errors ? !!errors.name : false}
          helperText={errors ? errors.name : null}
          placeholder={labels.name_info}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <TextField
          label={labels.brand_name}
          name="client[brand_name]"
          error={errors ? !!errors.brand_name : false}
          helperText={errors ? errors.brand_name : null}
          onKeyDownCapture={insertSpaceAndValidateNumber}
          inputProps={{ maxLength: 15 }}
          placeholder={labels.brand_name_info}
        />
      </FormControl>
      <FormControl className={classes.textFields}>
        <TextField
          label={labels.display_name}
          name="client[display_name]"
          error={errors ? !!errors.display_name : false}
          helperText={errors ? errors.display_name : null}
          onKeyDownCapture={insertSpaceAndValidateNumber}
          inputProps={{ maxLength: 15 }}
          placeholder={labels.display_name_info}
        />
      </FormControl>
    </Grid>
  );
};

ClientInformation.propTypes = {
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  errors: PropTypes.objectOf(PropTypes.array),
};

ClientInformation.defaultProps = {
  errors: null,
};

export default ClientInformation;
