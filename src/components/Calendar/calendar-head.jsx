import './calendar.css';
import '../../pages/SignUp';
import { soberDate } from '../../pages/SignUp';
import { Box, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import React from 'react';

const CalendarHead = props => {
  const {
    allMonths,
    setMonth,
    toggleMonthSelect,
    currentMonth,
    currentYear,
    showMonthTable,
    soberDate
  } = props;

  let months = [];

  allMonths.map(month =>
    months.push(
      <Td
        colSpan="2"
        className="month-cell"
        style={{ textAlign: 'center' }}
        key={month}
        onClick={e => setMonth(month)}
      >
        <span>{month}</span>
      </Td>
    )
  );

  let rows = [];
  let cells = [];

  months.forEach((month, i) => {
    if (i % 3 !== 0 || i === 0) {
      cells.push(month);
    } else {
      rows.push(cells);
      cells = [];
      cells.push(month);
    }
  });
  rows.push(cells);

  let monthList = rows.map((row, i) => <Tr key={i}>{row}</Tr>);

  window.onload = function() {
    // Month Day, Year Hour:Minute:Second, id-of-element-container
    countUpFromTime(new Date(soberDate).getTime(), 'countup1'); // Call countUpFromTime with soberDate state value
  };
  function countUpFromTime(countFrom, id) {
    countFrom = new Date(countFrom).getTime();
    const now = new Date(),
        timeDifference = (now - countFrom);
      
    const secondsInADay = 60 * 60 * 1000 * 24;
       
    const days = Math.floor(timeDifference / (secondsInADay) * 1);
    const months = Math.floor(days / 31);
    let years = Math.floor(days / 365);
    if (years > 1){ days = days - (years * 365) }
     
     
    
    const idEl = document.getElementById(id);
    idEl.getElementsByClassName('years')[0].innerHTML = years;
    idEl.getElementsByClassName('months')[0].innerHTML = months;
    idEl.getElementsByClassName('days')[0].innerHTML = days;
    
    
    clearTimeout(countUpFromTime.interval);
    countUpFromTime.interval = setTimeout(function(){ countUpFromTime(countFrom, id); }, 1000);
  }
  
  

  return (
    <Box component={Box} className="month-selector">
      <Table>
        <Thead>
          <Tr>
            <Td
              className="toggle-month"
              colSpan="4"
              onClick={() => toggleMonthSelect()}
            >
              {currentMonth()}
              <ChevronDownIcon className="arrow-icon" />
            </Td>
            <Td colSpan="4">{currentYear()}</Td>
          </Tr>
        </Thead>
        {showMonthTable ? (
          <Tbody>
            <Tr>
              <Td
                colSpan="5"
                style={{ textAlign: 'center' }}
                className="select-month-title"
              >
                Select a month
              </Td>
            </Tr>
            {monthList}
          </Tbody>
        ) : null}
      </Table>
    </Box>
  );
};

export default CalendarHead;
