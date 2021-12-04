import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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
  exchange: {
    top: theme.spacing(8),
    backgroundColor: 'transparent',
    alignItems: 'baseline',
    width: '100%',
    height: 'fit-content',
    maxWidth: '500px',
    left: '0',
    [theme.breakpoints.up('sm')]: {
      left: 'calc(50% - 250px)',
    },
    borderBottomLeftRadius: '15px',
    borderBottomRightRadius: '15px',
    '& > form': {
      margin: 0,
      '& > div:nth-child(6)': {
        justifyContent: 'center',
      },
    },
  },
}), { index: 1 });

export default useStyles;
