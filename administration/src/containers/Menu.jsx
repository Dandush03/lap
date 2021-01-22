import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useTheme } from '@material-ui/core/styles';
import {
  CssBaseline, Divider, Drawer,
  Hidden, List,
} from '@material-ui/core';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import LocalGroceryStoreOutlinedIcon from '@material-ui/icons/LocalGroceryStoreOutlined';
import AccountBalanceOutlinedIcon from '@material-ui/icons/AccountBalanceOutlined';

import useStyles from '../styles/layoutMenu';
import Header from '../components/Header';
import MenuItem from '../components/MenuItem';

const Menu = ({
  window, menu, locale,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        lab brand logo
      </div>
      <Divider />
      <List className={classes.list}>
        <MenuItem
          menuItem={menu.articles}
          locale={locale}
          Icon={ShoppingBasketIcon}
          classes={classes}
        />
        <MenuItem
          menuItem={menu.banking}
          locale={locale}
          Icon={AccountBalanceOutlinedIcon}
          classes={classes}
        />
      </List>
      <List className={classes.list}>
        <MenuItem
          menuItem={menu.sales}
          locale={locale}
          Icon={LocalGroceryStoreOutlinedIcon}
          classes={classes}
          opened
        />
      </List>
      <Divider />
      <List />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <Header classes={classes} toggleDrawer={handleDrawerToggle} />
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
    </>
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
