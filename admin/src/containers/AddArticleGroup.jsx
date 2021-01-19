import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, FormControl, Grid, TextField,
} from '@material-ui/core';
import { createArticleGroup } from '../actions/articleGroups';

const AddArticleGroup = ({
  open, setOpen, classes,
}) => {
  const auth = useSelector((state) => state.CSRF.authToken);
  const labels = useSelector((state) => state.i18n.articles_groups.show);
  const form = useRef();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);

  const closeHandler = () => {
    setOpen(!open);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(form.current);
    dispatch(createArticleGroup(formData, setErrors, closeHandler));
    form.current.reset();
  };

  return (
    <>
      <form action="" className={classes.subForm} ref={form} onSubmit={submitHandler}>
        <input type="hidden" name="authenticity_token" value={auth} />
        <h1 className={classes.title}>{labels.title}</h1>
        <Grid container className={classes.gridContainer}>
          <FormControl className={classes.textFields} fullWidth>
            <TextField
              label={labels.name}
              name="articles_group[name]"
              required
              error={errors ? !!errors.name : false}
              helperText={errors ? errors.name : null}
              autoComplete="off"
              placeholder={labels.name_info}
            />
          </FormControl>
        </Grid>
        <Grid container className={classes.btnContainers}>
          <Button variant="contained" color="primary" type="submit">
            {labels.save}
          </Button>
          <Button variant="contained" color="secondary" onClick={closeHandler}>
            {labels.cancel}
          </Button>
        </Grid>
      </form>
    </>
  );
};

AddArticleGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default AddArticleGroup;
