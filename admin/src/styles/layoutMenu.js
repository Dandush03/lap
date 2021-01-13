import { makeStyles } from '@material-ui/core/styles';

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
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstLink: {
    paddingTop: 0,
    paddingBottom: 0,
    position: 'relative',
    '& > a': {
      color: 'black',
    },
    '&:hover': {
      backgroundColor: '#e8e8e8',
    },
    '&:hover > a': {
      display: 'flex',
      paddingLeft: '0',
      paddingRight: '0',
      justifyContent: 'center',
    },
    '&:hover > a > div': {
      paddingLeft: '16px',
      paddingRight: '16px',
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
      // paddingLeft: theme.spacing(6),
    },
    '& > a:hover': {
      // backgroundColor: '',
    },
    '& > a:first-child': {
      // width: '100%',
    },
  },
}));

export default useStyles;
