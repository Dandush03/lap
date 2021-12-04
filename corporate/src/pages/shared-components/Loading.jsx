import React from 'react';

// Matirial UI
import {
  Backdrop, CircularProgress,
} from '@material-ui/core';

// Styles
import useStyles from 'styles/layout';
import PropTypes from 'prop-types';

const Loading = ({ open }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.fetching} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Loading.propTypes = {
  open: PropTypes.bool,
};

Loading.defaultProps = {
  open: true,
};

export default Loading;
