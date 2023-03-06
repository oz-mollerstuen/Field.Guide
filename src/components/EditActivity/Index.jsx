import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Select,
  Slider,
  Button,
  MenuItem,
  useStyleConfig,
} from '@chakra-ui/react';

function EditActivity(props) {
  const [classes, _] = useStyleConfig({
    formControl: {
      minWidth: '100%',
    },
    selectEmpty: {
      marginTop: '2',
    },
  });

  const {
    authUser,
    firebase,
    activity,
    activityKey,
    setEditing,
    setIsOpen,
    setToastMsg,
  } = props;
  const uid = authUser.uid;

  // Set default activity object
  const defaultActivity = {
    name: activity.name,
    type: activity.type,
    duration: activity.duration,
    date: activity.date,
  };

  const [newActivity, setNewActivity] = useState(defaultActivity);

  const handleChange = e => {
    const { name, value } = e.target;
    setNewActivity({
      ...newActivity,
      [name]: value,
    });
  };

  const handleSlider = e => {
    const duration = e.target.getAttribute('aria-valuenow');
    setNewActivity({ ...newActivity, duration: duration });
  };

  const isValid = newActivity.name === '';

  // Add the activity to firebase via the API made in this app
  const handleSubmit = action => {
    if (authUser) {
      firebase.updateActivity(uid, newActivity, activityKey);
      setEditing(false);
      // Show alert and hide after 3sec
      setIsOpen(true);
      setToastMsg('Updated activity');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={e => e.preventDefault()}>
      <FormControl className={classes.formControl}>
        <Input
          style={{ marginTop: '5px' }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={newActivity.name}
          label="Activity name"
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
          <Text id="discrete-slider" gutterBottom>
            Type
          </Text>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={newActivity.type}
            style={{ minWidth: '100%' }}
            name="type"
            onChange={handleChange}
          >
            <MenuItem value={1}>Lifting Weights</MenuItem>
            <MenuItem value={2}>Running</MenuItem>
            <MenuItem value={3}>Cycling</MenuItem>
          </Select>
        </div>
        <Text id="discrete-slider" gutterBottom>
          Duration
        </Text>
        <Slider
          defaultValue={parseInt(newActivity.duration)}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={10}
          marks
          min={10}
          max={120}
          name="duration"
          onChange={handleSlider}
          style={{ marginBottom: '20px' }}
        />
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        colorScheme="blue"
        onClick={() => handleSubmit('add')}
        disabled={isValid}
      >
        Save activity
      </Button>
    </form>
  );
}

export default withFirebase(EditActivity);