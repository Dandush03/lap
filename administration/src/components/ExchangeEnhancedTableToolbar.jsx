import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Toolbar, Tooltip, Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

const ExchangeEnhancedTableToolbar = ({
  numSelected, classes, selected, title,
}) => (
  <Toolbar
    className={classes.rootToolbar}
  >
    {numSelected > 0 ? (
      <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
        {numSelected}
        {' '}
        {selected}
      </Typography>
    ) : (
      <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
    )}

    {numSelected > 0 ? (
      <Tooltip title="Delete">
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    ) : (
      <Tooltip title="Filter list">
        <IconButton aria-label="filter list">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    )}
  </Toolbar>
);

ExchangeEnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default ExchangeEnhancedTableToolbar;
