import React, { useState, useEffect } from 'react';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Toast, Grid, Box } from '@chakra-ui/react';
import moment from 'moment';
import AddActivity from '../AddActivity/Index.jsx';
import EditActivity from '../EditActivity/Index.jsx';
import ActivityList from '../ActivityList/Index.jsx';

function Calendar(props) {
  const { firebase, authUser, date, setDate } = props;

  let defaultSelectedDay = {
    day: moment().format('D'),
    month: moment().month(),
  };

  /*** HOOKS ***/
  const [dateObject, setdateObject] = useState(moment());
  const [showMonthTable, setShowMonthTable] = useState(false);
  const [selectedDay, setSelected] = useState(defaultSelectedDay);
  // const toast = useToast();
  // Later add hook for active days from database

  /*** CALENDAR HEAD ***/
  const allMonths = moment.months();
  const currentMonth = () => dateObject.format('MMMM');
  const currentYear = () => dateObject.format('YYYY');

  const setMonth = month => {
    let monthNo = allMonths.indexOf(month);
    let newDateObject = Object.assign({}, dateObject);
    newDateObject = moment(dateObject).set('month', monthNo);
    setdateObject(newDateObject);
    setShowMonthTable(false);
  };

  const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);

  /*** CALENDAR BODY ***/
  const setSelectedDay = day => {
    setSelected({
      day,
      month: currentMonthNum(),
    });
    // Later refresh data
  };

  const currentMonthNum = () => dateObject.month();
  const daysInMonth = () => dateObject.daysInMonth();
  const currentDay = () => dateObject.format('D');
  const actualMonth = () => moment().format('MMMM');

  const firstDayOfMonth = () => moment(dateObject).startOf('month').format('d');

  /*** ADDING AN ACTIVITY ***/
  const [isOpen, setIsOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  /*** ACTIVITY LIST ***/
  const [activities, setActivities] = useState(true);
  const [loading, setLoading] = useState([]);
  const [activeDays, setActiveDays] = useState([]);

  const retrieveData = () => {
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    ref
      .orderByChild('date')
      .equalTo(queryDate)
      .on('value', snapshot => {
        let data = snapshot.val();
        setActivities(data);
        setLoading(false);
        // setEditing(false); Add later
      });

    // Update active days
    retrieveActiveDays();
  };

  const retrieveActiveDays = () => {
    let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
    ref.on('value', snapshot => {
      let data = snapshot.val();
      const values = Object.values(data);
      // Store all active day/month combinations in array for calendar
      const arr = values.map(obj => {
        return obj.date.length === 8
          ? obj.date.slice(0, 3)
          : obj.date.slice(0, 4);
      });
      console.log(arr);
      setActiveDays(arr);
    });
  };

  useEffect(() => [selectedDay]);

  /*** EDIT AN ACTIVITY ***/
  const [editing, setEditing] = useState(false);
  const [activity, setActivity] = useState(null);
  const [activityKey, setActivityKey] = useState(null);

  const editActivity = (activity, i) => {
    setActivityKey(Object.keys(activities)[i]);
    setEditing(true);
    setActivity(activity);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8} lg={9}>
        <CalendarHead
          allMonths={allMonths}
          currentMonth={currentMonth}
          currentYear={currentYear}
          setMonth={setMonth}
          showMonthTable={showMonthTable}
          toggleMonthSelect={toggleMonthSelect}
        />
        <CalendarBody
          firstDayOfMonth={firstDayOfMonth}
          daysInMonth={daysInMonth}
          currentDay={currentDay}
          currentMonth={currentMonth}
          currentMonthNum={currentMonthNum}
          actualMonth={actualMonth}
          setSelectedDay={setSelectedDay}
          selectedDay={selectedDay}
          weekdays={moment.weekdays()}
          activeDays={activeDays}
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Box className="box">
          {editing ? (
            <>
              <h3>
                Edit activity on {selectedDay.day}-{selectedDay.month + 1}{' '}
              </h3>
              <EditActivity
                activity={activity}
                activityKey={activityKey}
                selectedDay={selectedDay}
                authUser={props.authUser}
                setEditing={setEditing}
                setIsOpen={setIsOpen}
                setToastMsg={setToastMsg}
              />
            </>
          
            ) : (
              <>
                <h3>
                  Add activity on {selectedDay.day}-{selectedDay.month + 1}{' '}
                </h3>
                <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={date}
                    onChange={date => setDate(date)}
                  />
                </div>
                <AddActivity
                  selectedDay={selectedDay}
                  authUser={props.authUser}
                  setIsOpen={setIsOpen}
                  setToastMsg={setToastMsg}
              />
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box className="box">
          <h3>
            Activities on {selectedDay.day}-{selectedDay.month + 1}
          </h3>
          <ActivityList
            loading={loading}
            activities={activities}
            authUser={props.authUser}
            setIsOpen={setIsOpen}
            setToastMsg={setToastMsg}
            editActivity={editActivity}
            setEditing={setEditing}
          />
        </Box>
      </Grid>
      <Toast
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={isOpen}
        message={toastMsg}
      />
    </Grid>
  );
}

export default Calendar;
