import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    marginTop: theme.spacing(8),
  },
  backdrop: {
    paddingTop: theme.spacing(8),
    height: '100%',
    zIndex: '950',
    alignItems: 'baseline',
    [theme.breakpoints.up('sm')]: {
      left: '240px',
      width: ('calc(100% - 240px)'),
    },
  },
  fetching: {
    zIndex: '9999',
  },
  alertContainer: {
    width: '100%',
    '& > div > div': {
      justifyContent: 'center',
      display: 'flex',
    },
  },
  alert: {
    width: '100%',
  },
}), { index: 1 });

export default useStyles;
