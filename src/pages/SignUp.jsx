import React, { useState } from 'react';
import { withFirebase } from '../components/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import  useStylesInUp from '../config/theme.signinup';
import { Grid, Box, Text, Input, Button, Avatar, CSSReset, ChakraProvider, } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';

function SignUp(props) {
  const navigate = useNavigate();
  const classes = useStylesInUp();
  const initialUser = {
    id: null,
    name: '',
    email: '',
    password: '',
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = e => {
    props.firebase.auth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        
        return props.firebase.user(authUser.user.uid).set({
          username: user.name,
          email: user.email,
          activities: 'not set',
        });
      })
      .then(authUser => {
        setUser(initialUser);
        navigate('/dashboard');
      })
      .catch(error => {
        setUser({ ...user, error: error.message });
      });
  };

  const isValid = user.name === '' || user.email === '' || user.password === '';

  return (
    <ChakraProvider>
      <Grid container component="main" className={classes.root}>
        <CSSReset />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square>
          <div className={classes.box}>
            <Avatar className={classes.avatar}>
              <Icon />
            </Avatar>
            <Text component="h1" variant="h5">
              Sign Up
            </Text>
            <form
              className={classes.form}
              noValidate
              onSubmit={e => e.preventDefault()}
            >
              <Input
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={user.name}
                onChange={handleChange}
              />
              <Input
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={handleChange}
              />
              <Input
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
              <Text className={classes.error}>
                {user.error ? user.error : ''}
              </Text>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={isValid}
              >
                Sign up
              </Button>
              <Grid container>
                <Grid item>
                  <Link to="/">{'Already have an account? Sign In'}</Link>
                </Grid>
              </Grid>
              <Box mt={5}>
               
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default withFirebase(SignUp);
