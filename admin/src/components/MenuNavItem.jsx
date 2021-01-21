import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const MenuNavItem = ({
  menuItem, locale, Icon, classes,
}) => {
  const tempMenuItem = Array.from(menuItem);

  const listGroup = tempMenuItem.shift();

  return (
    <>
      <ListItem button component={Link} to={`/${locale}/${listGroup.path}`}>
        <ListItem className={classes.link}>
          <ListItemIcon><Icon /></ListItemIcon>
          <ListItemText primary={listGroup.title}>
            <ListItemIcon><AddIcon /></ListItemIcon>
          </ListItemText>
        </ListItem>
      </ListItem>
    </>
  );
};

MenuNavItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string.isRequired,
  Icon: PropTypes.objectOf(oneOfType([PropTypes.symbol, PropTypes.object])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
};

export default MenuNavItem;
