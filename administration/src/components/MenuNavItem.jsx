import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';

const MenuNavItem = ({
  menuItem, locale, Icon, classes, opened,
}) => {
  const tempMenuItem = Array.from(menuItem);

  const listGroup = tempMenuItem.shift();

  return (
    <>
      <ListItem button className={classes.unique}>
        <ListItem className={classes.link} component={Link} to={`/${locale}/${listGroup.path}`}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={listGroup.title} />
        </ListItem>
        {opened ? (
          <ListItem button component={Link} to={`/${locale}/${listGroup.path}/new`} className={classes.addLink}>
            <ListItemIcon><AddIcon /></ListItemIcon>
          </ListItem>
        ) : null}
      </ListItem>
    </>
  );
};

MenuNavItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  locale: PropTypes.string.isRequired,
  Icon: PropTypes.objectOf(oneOfType([PropTypes.symbol, PropTypes.object])).isRequired,
  classes: PropTypes.objectOf(oneOfType([PropTypes.object, PropTypes.string])).isRequired,
  opened: PropTypes.bool,
};

MenuNavItem.defaultProps = {
  opened: false,
};

export default MenuNavItem;
