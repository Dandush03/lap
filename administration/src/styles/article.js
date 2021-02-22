import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '900px',
    margin: theme.spacing(3),
  },
  mainTitle: {
    fontWeight: 'normal',
    marginTop: '0',
  },
  title: {
    textAlign: 'center',
  },
  gridContainer: {
    padding: theme.spacing(2, 0),
  },
  textFields: {
    marginBottom: theme.spacing(2),
    minWidth: '45%',
  },
  imageTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('xs')]: {
      order: 2,
    },
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
  dropZoneContainer: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('xs')]: {
      order: 1,
    },
    [theme.breakpoints.up('sm')]: {
      order: 2,
    },
    '&:hover': {
      '&:last-child > div:last-child': {
        border: 'lightgray 2px dashed',
        zIndex: 2,
        '& > div': {
          opacity: '1 !important',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        '& > div > svg': {
          color: 'white',
        },
        '& > div > span': {
          color: 'white',
        },
      },
    },
  },
  dropZoneLabelContainer: {
    position: 'relative',
    margin: 'auto',
    textAlign: 'center',
    left: '-1px',
    right: '-1px',
    top: '-1px',
    overflow: 'hidden',
    bottom: '-1px',
    border: '1px dashed gray',
    '&::after': {
      content: '""',
      display: 'block',
      paddingBottom: '100%',
    },
    [theme.breakpoints.up('xs')]: {
      width: '40%',
    },
    [theme.breakpoints.up('sm')]: {
      width: '65%',
    },
  },
  dropZoneLabel: {
    width: '100%',
    color: 'gray',
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    position: 'absolute',
    zIndex: 2,
    [theme.breakpoints.up('xs')]: {
      fontSize: '16px',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
    '& > svg': {
      [theme.breakpoints.up('xs')]: {
        fontSize: '60px',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '30px',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '50px',
      },
    },
  },
  dropZone: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
  },
  dropZoneImage: {
    minWidth: '100%',
    height: '100%',
    position: 'absolute',
    margin: 'auto',
    top: '-500px',
    bottom: '-500px',
    right: '-500px',
    left: '-500px',
  },
  info: {
    [theme.breakpoints.up('sm')]: {
      flexBasis: 'calc(50% - .5px)',
      padding: theme.spacing(0, 2),
      display: 'flex',
      flexDirection: 'column',
    },
  },
  invInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 2),
    width: '70%',
  },
  invInfoGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    '& > div': {
      width: '45%',
    },
  },
  newCat: {
    width: '100%',
    backgroundColor: 'red !important',
    color: 'white',
    '&:hover': {
      backgroundColor: 'red',
    },
  },
  backdrop: {
    zIndex: '950',
    left: '240px',
    paddingTop: theme.spacing(8),
    height: '100%',
    width: ('calc(100% - 240px)'),
    alignItems: 'baseline',
  },
  subForm: {
    maxWidth: '600px',
    backgroundColor: 'white',
    border: 'solid #33418d 3px',
    borderTop: '0',
    width: '100%',
    maxHeight: '100%',
    margin: theme.spacing(0, 8),
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0, 8, 4, 8),
    justifyContent: 'center',
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
  },
  btnContainers: {
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > button': {
      width: '100px',
    },
  },
}), { index: 1 });

export default useStyles;
