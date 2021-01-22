import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
}), { index: 1 });

export default useStyles;
