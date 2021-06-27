import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';

import {
  Grid, Input,
} from '@material-ui/core';

import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import {
  dragEnterHandler, dragLeaveHandler, dragEndHandler, changeImageHandler,
} from 'javascripts/inputFunctions';

const ClientImage = ({
  labels, classes,
}) => {
  useEffect(() => {
    window.addEventListener('dragenter', dragEnterHandler);
  }, []);

  return (

    <Grid item className={classes.dropZoneContainer} sm={5} xs={12}>
      <Input
        type="file"
        id="file_uploader"
        name="client[picture]"
        onDragLeave={dragLeaveHandler}
        onDropCapture={dragEndHandler}
        onChange={changeImageHandler}
        className={classes.dropZone}
        inputProps={{ className: classes.dropZone }}
      />
      <div className={classes.dropZoneLabelContainer} id="file_label">
        <div className={classes.dropZoneLabel}>
          <img alt="Client" id="file_img" style={{ opacity: 0 }} className={classes.dropZoneImage} />
        </div>
        <div className={classes.dropZoneLabel}>
          <ImageSearchIcon color="disabled" fontSize="large" />
          <span>{labels.file_upload}</span>
        </div>
      </div>
    </Grid>
  );
};

ClientImage.propTypes = {
  labels: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
};

export default ClientImage;
