import React from 'react';
import './calendar.css';
import { Box, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';

const CalendarBody = props => {
  const {
    firstDayOfMonth,
    daysInMonth,
    currentDay,
    currentMonth,
    currentMonthNum,
    selectedDay,
    activeDays,
    setSelectedDay,
    actualMonth,
    weekdays,
  } = props;

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<Td key={`blank-${i}`}>{''}</Td>);
  }
  let monthDays = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let currDay, selectDay, activeDay;

    // Check if day is today
    if (currentDay() === d && currentMonth() === actualMonth()) currDay = 'today';

    // Check if day is selected day
    if (selectedDay.day === d && currentMonthNum() === selectedDay.month)
      selectDay = 'selected-day';

    // Check if day found in this month active days
    let formattedDate = `${d}-${currentMonthNum()}`;
    if (activeDays.indexOf(formattedDate) !== -1) activeDay = 'active';

    // console.log(activeDays);

    monthDays.push(
      <Td
        key={d}
        className={`week-day ${currDay} ${selectDay}`}
        onClick={() => setSelectedDay(d)}
      >
        <span className={activeDay}>{d}</span>
      </Td>
    );
  }

  let totalSlots = [...blanks, ...monthDays];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(row);
    }
    if (i === totalSlots.length - 1) {
      rows.push(cells);
    }
  });

  return (
    <Box component={Box}>
      <Table className="calendar">
        <Thead>
          <Tr>
            {weekdays.map((day, i) => (
              <Td key={i}>{day}</Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((day, i) => (
            <Tr key={i}>{day}</Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CalendarBody;
