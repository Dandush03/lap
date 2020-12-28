import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Divider, FormControl, FormHelperText, Grid, Input, TextField,
} from '@material-ui/core';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import {
  changeInputToUppercase, dragEnterHandler, dragLeaveHandler,
  insertSpaceAndValidateNumber, dragEndHandler, changeImageHandler,
} from './inputFunctions';
import RadioBtnsField from './_RadioBtnsField';
import useStyles from './styles';

const NewArticle = ({ auth, labels, errors }) => {
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
  }, []);

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
        <Grid item className={classes.imageTextContainer} sm={7} xs={12}>
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
              onKeyDownCapture={insertSpaceAndValidateNumber}
              inputProps={{ maxLength: 15 }}
            />
            <FormHelperText id="my-helper-text">{labels.upc_code}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item className={classes.dropZoneContainer} sm={5} xs={12}>
          <Input
            type="file"
            id="file_uploader"
            name="article[picture]"
            onDragLeave={dragLeaveHandler}
            onDropCapture={dragEndHandler}
            onChange={changeImageHandler}
            className={classes.dropZone}
            inputProps={{ className: classes.dropZone }}
          />
          <div className={classes.dropZoneLabelContainer} id="file_label">
            <div className={classes.dropZoneLabel}>
              <img alt="Article" id="file_img" style={{ opacity: 0 }} className={classes.dropZoneImage} />
            </div>
            <div className={classes.dropZoneLabel}>
              <ImageSearchIcon color="disabled" fontSize="large" />
              <span>Please Drag Your Images Here Or Search for one</span>
            </div>
          </div>
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
};

NewArticle.defaultProps = {
  errors: null,
};

export default NewArticle;
