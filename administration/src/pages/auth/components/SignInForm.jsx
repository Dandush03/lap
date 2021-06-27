import React, { useRef } from 'react';
import PropTypes from 'prop-types';

// Matirial UI
import {
  Avatar, Box, Button, Checkbox, Container,
  CssBaseline, FormControlLabel, Grid,
  Link, TextField, Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch } from 'react-redux';

// Actions
import { signInUser } from 'actions/user';

// Shared Component
import Copyright from 'shared-components/Copyright';

// Styles
import useStyles from 'styles/signInForm';

const SignInForm = ({ CSRF, i18n }) => {
  const classes = useStyles();
  const form = useRef();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(signInUser(formData));
  };
  if (!i18n) return (<></>);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {i18n.title}
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler} ref={form}>
          <input type="hidden" defaultValue={CSRF.authToken} name="authenticity_token" />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label={i18n.login}
            name={`${CSRF.resource}[login]`}
            autoComplete="login"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name={`${CSRF.resource}[password]`}
            label={i18n.password}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label={i18n.remember_me}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {i18n.sign_in}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/" variant="body2">
                {i18n.forgot_password}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/" variant="body2">
                {i18n.dont_have_account}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

SignInForm.propTypes = {
  CSRF: PropTypes.objectOf(PropTypes.string).isRequired,
  i18n: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SignInForm;
