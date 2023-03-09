import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import {
  FormControl,
  Input,
  Text,
  Select,
  Slider,
  Button,
  useStyles,
  } from '@chakra-ui/react';

function AddActivity(props) {
  const style = useStyles;
  const { authUser, firebase, selectedDay, setIsOpen, setToastMsg } = props;
  const uid = authUser.uid;

  // Set query date for updating database
  selectedDay.year = new Date().getFullYear();
  let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

  // Set default activity object
  const defaultActivity = {
    name: '',
    type: 1,
    duration: 60,
    date: queryDate,
  };

  const [activity, setActivity] = useState(defaultActivity);

  const handleChange = e => {
    const { name, value } = e.target;
    setActivity({
      ...activity,
      date: queryDate,
      [name]: value,
    });
  };

  const handleSlider = e => {
    const duration = e.target.getAttribute('aria-valuenow');
    setActivity({ ...activity, duration: duration });
  };

  const isValid = activity.name === '';

  // Add the activity to firebase via the API made in this app
  const handleSubmit = () => {
    if (authUser) {
      firebase.addActivity(uid, activity);
      setActivity(defaultActivity);
      // Show notification
      setIsOpen(true);
      setToastMsg('Added activity');
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    }
  };

  return (
    <form noValidate onSubmit={e => e.preventDefault()}>
      <FormControl className={style.formControl}>
        <Input
          style={{ marginTop: '5px', width: "25vw"}}
          variant="outlined"
          margin="normal"
          required
          
          label="Activity name"
          value={activity.name}
          name="name"
          onChange={handleChange}
        />
        <div style={{ marginTop: '20px', marginBottom: '30px' }}>
          <Text id="discrete-slider" mb>
            Type
          </Text>
          <Select
            labelid="demo-simple-select-label"
            id="demo-simple-select"
            value={activity.type}
            style={{width: "75vw" }}
            name="type"
            onChange={handleChange}
          >
            <option value={1}>Online Meeting</option>
            <option value={2}>Phonecall</option>
            <option value={3}>In-person Meeting</option>
          </Select>
        </div>
        
      </FormControl>
      <Button
        type="submit"
        width="75vw"
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isValid}
      >
        Add a Meeting
      </Button>
    </form>
  );
}

export default withFirebase(AddActivity);