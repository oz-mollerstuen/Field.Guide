import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import  useStylesInUp from '../config/theme.signinup';
import { Grid, GridItem, Box, Text, Input, Button, Avatar, CSSReset, ChakraProvider, } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import 'firebase/compat/firestore';
import 'firebase/auth';


function SignUp(props) {
  const navigate = useNavigate();
  const classes = useStylesInUp;
  const initialUser = {
    id: null,
    name: '',
    email: '',
    password: '',
    error: null,
    auth: null,
  };
  const [user, setUser] = useState(initialUser);
  const [soberDate, setSoberDate] = useState(''); 

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'SoberDate') {
      setSoberDate(value);
    } else {
      setUser({ ...user, [name]: value });
    }
  };
 
  const handleSubmit = e => {
    props.firebase
      .doCreateUserWithEmailAndPassword(user.email, user.password)
      .then(authUser => {
        return props.firebase.user(authUser.user.uid).set({
          username: user.name,
          email: user.email,
          activities: 'not set',
          soberDate: soberDate, // added soberDate to user object
        });
      })
      .then(authUser => {
        setUser(authUser);
        navigate('/dashboard');
      })
      .catch(error => {
        setUser({ ...user, error: error.message });
      });
  };

  const isValid = user.name === '' || user.email === '' || user.password === '';

  return (
    <ChakraProvider>
      <Grid component="main" className={classes.root}>
        <CSSReset />
        <GridItem xs="false" sm={4} md={7} className={classes.image} />
        <GridItem xs={12} sm={8} md={5} component={Box} elevation={6} square="true">
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
                width="75vw"
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
               <Input
                variant="outlined"
                margin="normal"
                required
                width="15vw"
                name="SoberDate"
                label="SoberDate"
                type="Date"
                id="SoberDate"
                value= {soberDate}
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
                Sign up
              </Button>
              <Grid>
                <GridItem>
                  <Link to="/">{'Already have an account? Sign In'}</Link>
                </GridItem>
              </Grid>
              <Box mt={5}>
               
              </Box>
            </form>
          </div>
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}

export default SignUp;
