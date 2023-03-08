import React, { useState } from 'react';

import { withFirebase } from '../components/Firebase';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Box,
  Text,
  Input,
  Button,
  Avatar,
  ChakraProvider,
  CSSReset,
  Icon,
} from '@chakra-ui/react';
import Firebase from '../components/Firebase';
import PasswordForget from '../components/PasswordForget/Index';
import useStylesInUp from '../config/theme.signinup';

const GlobalStyle = () => <CSSReset />;

function SignIn(props) {
  const classes = useStylesInUp;

  const initialUser = {
    id: null,
    email: '',
    password: '',
    error: null,
    auth: null,
  };

  const [user, setUser] = useState(initialUser);

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
 
   const handleSubmit = () => {
    console.log(user.email, user.password);
    console.log('Hey there!');
    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        console.log('Authenticated user:', authUser);
        setUser(initialUser);
        navigate('/dashboard');
      })
      .catch(error => {
        setUser({ ...user, error: error.message });
      });
  };
  console.log(props.firebase);
  const isValid = user.email === '' || user.password === '';

  return (
    <ChakraProvider>
      <GlobalStyle />
      <Grid container component="main" className={classes.root}>
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Box} elevation={6} square>
          <div className={classes.box}>
            <Avatar className={classes.avatar}>
              <Icon />
            </Avatar>
            <Text component="h1" variant="h5">
              Sign in
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
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <PasswordForget />
                </Grid>
                <Grid item>
                  <Link to="/sign-up">Don't have an account? Sign Up</Link>
                </Grid>
              </Grid>
            </form>
          </div>
        </Grid>
      </Grid>
    </ChakraProvider>
  );
}

export default withFirebase(SignIn);
