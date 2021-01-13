import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import {
  AppBar, CssBaseline, Divider, Drawer,
  Hidden, IconButton, List, Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';

import CollapsableMenuItem from '../components/MenuCollapsableItem';
import useStyles from '../styles/layoutMenu';

const Menu = ({
  window, menu, locale,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuContainer = useRef();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        lab brand logo
      </div>
      <Divider />
      <List>
        <CollapsableMenuItem
          menuItem={menu.articles}
          locale={locale}
          Icon={ShoppingBasketIcon}
          classes={classes}
        />
      </List>
      <Divider />
      <List />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root} ref={menuContainer}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

Menu.propTypes = {
  window: PropTypes.func,
  menu: PropTypes.objectOf(PropTypes.array).isRequired,
  locale: PropTypes.string.isRequired,
};

Menu.defaultProps = {
  window: undefined,
};

export default Menu;
