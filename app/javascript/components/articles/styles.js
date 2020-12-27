import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1024px',
  },
  gridContainer: {
    padding: theme.spacing(2, 0),
  },
  gridItem: {
    display: 'flex',
    flexDirection: 'column',
  },
  textFields: {
    marginBottom: theme.spacing(2),
  },
}));

export default useStyles;
