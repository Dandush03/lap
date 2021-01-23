import { makeStyles, fade } from '@material-ui/core/styles';

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
  link: {
    padding: 0,
    position: 'relative',
    '& > a': {
      color: 'black',
    },
    '&:hover': {
      backgroundColor: 'transparent',
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
  unique: {
    position: 'relative',
    '& > a': {
      color: 'black',
      [theme.breakpoints.up('md')]: {
        '&:nth-child(2)': {
          display: 'none',
        },
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.04)',
    },
    '&:hover > a': {
      '&:nth-child(2)': {
        display: 'flex',
        paddingLeft: '0',
        paddingRight: '0',
        justifyContent: 'center',
      },
    },
    '&:hover > a > div': {
    },
  },
  firstLink: {
    paddingTop: 0,
    paddingBottom: 0,
    position: 'relative',
    '& > a': {
      color: 'black',
      [theme.breakpoints.up('md')]: {
        '&:nth-child(2)': {
          display: 'none',
        },
      },
    },
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,.04)',
    },
    '&:hover > a': {
      '&:nth-child(2)': {
        display: 'flex',
        paddingLeft: '0',
        paddingRight: '0',
        justifyContent: 'center',
      },
    },
    '&:hover > a > div': {
    },
  },
  addLink: {
    width: '56px',
    position: 'absolute',
    right: '0',
    top: '0',
    bottom: '0',
    margin: 'auto',
    display: 'flex',
    paddingLeft: '0',
    paddingRight: '0',
    justifyContent: 'center',
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
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    marginTop: theme.spacing(3),
  },
}), { index: 1 });

export default useStyles;
