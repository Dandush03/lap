import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar, Box, Button, Checkbox, Container,
  CssBaseline, FormControlLabel, Grid,
  Link, TextField, Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
// import { LockOutlinedIcon } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import Copyright from './Copyright';
import { signInUser } from '../actions/user';
import useStyles from '../styles/signInForm';

const SignInForm = ({ CSRF }) => {
  const classes = useStyles();
  const form = useRef();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(signInUser(formData));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler} ref={form}>
          <input type="hidden" defaultValue={CSRF.authToken} name="authenticity_token" />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
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
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/" variant="body2">
                Don&apos;t have an account? Sign Up
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
};

export default SignInForm;
