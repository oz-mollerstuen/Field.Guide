import React, { useState } from 'react';
import { withFirebase } from '../components/Firebase';
import 'firebase/auth';

import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  GridItem,
  Box,
  Text,
  Input,
  Button,
  Avatar,
  ChakraProvider,
  CSSReset,
  Icon,
} from '@chakra-ui/react';
// import firebase from 'firebase/compat/app';
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

  const handleSubmit = event => {
    event.preventDefault();
    console.log(user.email, user.password);
    console.log('Hey there!');
    props.firebase
      .doSignInWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        console.log('Authenticated user:', authUser);
        setUser(authUser);
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
      <Grid box="true" component="main" className={classes.root}>
        <GridItem xs="false" sm={4} md={7} className={classes.image} />
        <GridItem
          xs={12}
          sm={8}
          md={5}
          component={Box}
          elevation={6}
          square="true"
        >
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
                width="75vw"
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
                width="75vw"
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
                width="75vw"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
                disabled={isValid}
              >
                Sign In
              </Button>
              <Grid box="true">
                <GridItem xs="true">
                  <PasswordForget />
                </GridItem>
                <GridItem>
                  <Link to="/sign-up">Don't have an account? Sign Up</Link>
                </GridItem>
              </Grid>
            </form>
          </div>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default withFirebase(SignIn);
