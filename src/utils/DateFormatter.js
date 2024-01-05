/**
 * Functional component that formats a date in the format "DD MMM YYYY".
 * @param {Object} props - The props object.
 * @param {string} props.date - The date to be formatted in the format "YYYY-MM-DD".
 * @returns {JSX.Element} - The formatted date as a JSX element.
 */
import React from 'react';
import Moment from 'react-moment';

const DateFormatter = ({ date }) => {
  return (
    <Moment format='DD MMM YYYY' withTitle>
      {date}
    </Moment>
  );
};

export default DateFormatter;
