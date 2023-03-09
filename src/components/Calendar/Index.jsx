import React, { useState, useEffect } from 'react';

import CalendarBody from './calendar-body';
import CalendarHead from './calendar-head';
import { onSnapshot, collection } from 'firebase/firestore';
// import "react-datepicker/dist/react-datepicker.css";
import { Toast, Grid, Box, GridItem } from '@chakra-ui/react';
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
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeDays, setActiveDays] = useState([]);
  useEffect(() => {
    const retrieveData = onSnapshot(
      collection(firebase.db, `users/${authUser.uid}/activities`),
      snapshot => {
        const activityArr = [];
        snapshot.forEach(activity => {
          activityArr.push(activity.data());
        });
        setActivities(activityArr);
        setLoading(false);
        // let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;
        // Update active days
        //   retrieveActiveDays();
      }
    );
    return () => retrieveData();
  }, []);

  // const retrieveActiveDays = () => {
  //   let ref = firebase.db.ref().child(`users/${authUser.uid}/activities`);
  //   ref.on('value', snapshot => {
  //     let data = snapshot.val();
  //     const values = Object.values(data);
  //     // Store all active day/month combinations in array for calendar
  //     const arr = values.map(obj => {
  //       return obj.date.length === 8
  //         ? obj.date.slice(0, 3)
  //         : obj.date.slice(0, 4);
  //     });
  //     console.log(arr);
  //     setActiveDays(arr);
  //   });
  // };

  // useEffect(() => {
  //   retrieveData()
  // }, []);

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
    <Grid spacing={3}>
      <GridItem xs={12} md={8} lg={9}>
        <div className="countup" id="countup1">
          <span className="timeel years">0</span>
          <span className="timeel timeRefYears">years</span>
          <span className="timeel months">00</span>
          <span className="timeel timeRefMonths">months</span>
          <span className="timeel days">00</span>
          <span className="timeel timeRefDays">days</span>
        
        </div>
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
      </GridItem>
      <GridItem xs={12} md={4} lg={3}>
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
                Meetings on {selectedDay.month + 1}-{selectedDay.day}{' '}
              </h3>
              {/* <div style={{ position: "relative" }}>
                  <DatePicker
                    selected={date}
                    onChange={date => setDate(date)}
                  />
                </div> */}
              <AddActivity
                selectedDay={selectedDay}
                authUser={props.authUser}
                setIsOpen={setIsOpen}
                setToastMsg={setToastMsg}
              />
            </>
          )}
        </Box>
      </GridItem>
      <GridItem xs={12} md={7}>
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
      </GridItem>
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
