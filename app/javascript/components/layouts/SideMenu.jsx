import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { Collapse } from '@material-ui/core';

const SideMenu = ({
  window, menu, locale, company,
}) => {
  const url = `/${locale}/${company}`;
  const drawerWidth = 240;
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    firstLink: {
      paddingTop: 0,
      paddingBottom: 0,
      position: 'relative',
      '&:hover > a': {
        display: 'flex',
        paddingLeft: '32px',
        paddingRight: '32px',
        justifyContent: 'center',
      },
    },
    addLink: {
      width: '56px',
      position: 'absolute',
      display: 'none',
      right: '0',
      top: '0',
      bottom: '0',
      margin: 'auto',
      '& > div': {
        minWidth: 'unset',
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    nested: {
      '& > li': {
        paddingLeft: theme.spacing(6),
      },
      '& > a:hover': {
        backgroundColor: '#e8e8e8',
      },
      '& > a:first-child': {
        width: '100%',
      },
    },
  }));

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon><ShoppingBasketIcon /></ListItemIcon>
          <ListItemText primary={menu.articles} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding className={classes.nested}>
            <ListItem button component="a" href={`${url}/articles`} className={classes.firstLink}>
              <ListItem>
                <ListItemText primary={menu.articles} />
              </ListItem>
              <ListItem button component="a" href={`${url}/articles/new`} className={classes.addLink}>
                <ListItemIcon><AddIcon /></ListItemIcon>
              </ListItem>
            </ListItem>
            <ListItem button component="a" href="/" className={classes.firstLink}>
              <ListItem>
                <ListItemText primary={menu.articles_group} />
              </ListItem>
              <ListItem button component="a" href="/" className={classes.addLink}>
                <ListItemIcon><AddIcon /></ListItemIcon>
              </ListItem>
            </ListItem>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
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

SideMenu.propTypes = {
  window: PropTypes.func.isRequired,
  menu: PropTypes.objectOf(PropTypes.object).isRequired,
  locale: PropTypes.string.isRequired,
  company: PropTypes.string.isRequired,
};

export default SideMenu;
