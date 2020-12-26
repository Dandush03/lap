import React, { useState } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddIcon from '@material-ui/icons/Add';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';
import useStyles from './menuStyle';

const CollapsableMenuItem = ({
  menuItem, partUrl, Icon,
}) => {
  const tempMenuItem = Array.from(menuItem);
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const listGroup = tempMenuItem.shift();

  const collapsableItems = tempMenuItem.map((el) => (
    <ListItem button className={classes.firstLink} key={el.name}>
      <ListItem component="a" href={`${partUrl}/${el.path}`}>
        <ListItemText primary={el.name} />
      </ListItem>
      { el.add ? (
        <ListItem button component="a" href={`${partUrl}/${el.path}/new`} className={classes.addLink}>
          <ListItemIcon><AddIcon /></ListItemIcon>
        </ListItem>
      ) : null}
    </ListItem>
  ));

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon><Icon /></ListItemIcon>
        <ListItemText primary={listGroup.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding className={classes.nested}>
          {collapsableItems}
        </List>
      </Collapse>
    </>
  );
};

CollapsableMenuItem.propTypes = {
  menuItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  partUrl: PropTypes.string.isRequired,
  Icon: PropTypes.objectOf(oneOfType([PropTypes.symbol, PropTypes.object])).isRequired,
};

export default CollapsableMenuItem;
