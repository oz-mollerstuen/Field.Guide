
import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import clsx from 'clsx';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {
    Drawer,
    Text,
    Divider,
    List,
    ListIcon,
    ListItem,
    IconButton,    
  } from '@chakra-ui/react';
  import { ArrowLeftIcon, CalendarIcon, SettingsIcon, ViewOffIcon } from '@chakra-ui/icons';

  import useStyles from '../../config/theme.dashboard';

function Sidebar(props) {
  let match = useMatch();

  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        box: clsx(classes.drawerBox, !props.open && classes.drawerBoxClose),
      }}
      open={props.open}
    >
      <div className={classes.Icon}>
        <IconButton onClick={props.handleDrawerClose}>
          <ArrowLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Text inset>Menu</Text>
        <Link to={`${match.url}`}>
          <ListItem button>
            <ListIcon>
              <CalendarIcon />
            </ListIcon>
            <ListItem primary="Workouts" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <div>
          <Text inset>Account</Text>
          <Link to={`${match.url}/settings`}>
            <ListItem button>
              <ListIcon>
                <SettingsIcon />
              </ListIcon>
              <ListItem primary="Settings" />
            </ListItem>
          </Link>
          <ListItem button onClick={() => props.signOut()}>
            <ListIcon>
              <ViewOffIcon />
            </ListIcon>
            <ListItem primary="Log out" />
          </ListItem>
        </div>
      </List>
    </Drawer>
  );
}

export default Sidebar;
