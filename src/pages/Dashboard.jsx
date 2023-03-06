import React from 'react';
import { ChakraProvider, Global } from '@chakra-ui/react';
import { AuthUserContext, withAuthentication } from '../components/Session';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
  Box,
  CSSReset,
  Button,
  Text,
  IconButton,
  Badge,
  Flex,
  Container,
  } from '@chakra-ui/react';
import Calendar from '../components/Calendar/Index.jsx';
import Copyright from '../components/Copyright';
import { MdMenu as MenuIcon } from 'react-icons/md';
import clsx from 'clsx';
import useStyles from '../config/theme.dashboard';
import { useMatch, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Index';
function Dashboard(props) {
  let match = useMatch();

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const history = useNavigate();

  const signOut = () => {
    props.firebase.auth.signOut();
    history.push('/');
  };

  return (
    <ChakraProvider>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <div className={classes.root}>
              <CSSReset />
              <Flex
                position="absolute"
                className={clsx(classes.Flex, open && classes.FlexShift)}
              >
                <Flex className={classes.flex}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    className={clsx(
                      classes.menuButton,
                      open && classes.menuButtonHidden
                    )}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Text
                    component="h1"
                    variant="h6"
                    color="inherit"
                    noWrap
                    className={classes.title}
                  >
                    Dashboard
                  </Text>
                  <Button colorScheme="teal">
                    <Badge colorScheme="red" ml={2}>
                      4
                    </Badge>
                    <Box as={MenuIcon} size="24px" />
                    username
                  </Button>
                  {/* <NotificationsIcon size={8} color="blue.500" strokeWidth={2} /> */}
                </Flex>
              </Flex>

              <Sidebar
                signOut={signOut}
                open={open}
                handleDrawerClose={handleDrawerClose}
              />

              <main
                className={`${classes.content} ${
                  !open ? classes.contentClosed : classes.FlexShift
                }`}
              >
                <div className={classes.FlexSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                  <Calendar firebase={props.firebase} authUser={authUser} />
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </Container>
              </main>
            </div>
          ) : (
            <p>Not authorized.</p>
          )
        }
      </AuthUserContext.Consumer>
    </ChakraProvider>
  );
}

export default withAuthentication(Dashboard);
