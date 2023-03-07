import React from 'react';
import './calendar.css';
import { Box, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
const CalendarHead = props => {
  const {
    allMonths,
    setMonth,
    toggleMonthSelect,
    currentMonth,
    currentYear,
    showMonthTable,
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
