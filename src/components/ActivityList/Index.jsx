import React from 'react';
import { withFirebase } from '../Firebase';
import loader from './loader.gif';
import { Box, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';


function ActivityList(props) {
  const {
    loading,
    activities,
    editActivity,
    setIsOpen,
    setToastMsg,
    setEditing,
  } = props;

  const deleteActivity = i => {
    // Get key of activity in firebase
    const activityKey = Object.keys(activities)[i];
    // Connect to our firebase API
    const emptyActivity = {
      date: null,
      duration: null,
      type: null,
      name: null,
    };

    props.firebase.updateActivity(
      props.authUser.uid,
      emptyActivity,
      activityKey
    );

    // Show notification
    setIsOpen(true);
    setToastMsg('Deleted activity');
    setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    // stop editing
    setEditing(false);
  };

  return (
    <>
      {loading === true ? <img src={loader} alt={loader}></img> : null}

      {activities === 'not set' || activities === null ? (
        <p>No Meetings added yet.</p>
      ) : (
        <Box component={Box}>
          <Table>
            <Thead>
              <Tr>
                <Td>Name</Td>
                <Td>Type</Td>
                <Td>Duration</Td>
                <Td>Actions</Td>
              </Tr>
            </Thead>
            <Tbody>
              {Object.values(activities).map((activity, i) => {
                let { name, type, duration } = activity;
                switch (activity.type) {
                  case 1:
                    type = 'In-Person Meeting';
                    break;
                  case 2:
                    type = 'Online Meeting';
                    break;
                  case 3:
                    type = 'Phone Call/text';
                    break;
                  default:
                    type = 'Not set';
                }
                return (
                  <Tr key={i}>
                    <Td>{name}</Td>
                    <Td>{type}</Td>
                    <Td>{duration}</Td>
                    <Td>
                      <DeleteIcon onClick={e => deleteActivity(i)} />
                      <EditIcon
                        onClick={e => editActivity(activity, i)}
                        style={{ marginLeft: '20px' }}
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
}

export default withFirebase(ActivityList);
