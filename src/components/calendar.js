import React from 'react';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

const MyCalendar = (props) => {
  let todos = props.todos.map((item) => {
    // console.log('from calendar', typeof(item.updatedAt));
    return {
      allDay: true,
      title: item.title,
      start: item.createdAt,
      end: item.updatedAt
    }
  });
  // console.log('from calendar', titles);
  return (
    <div className="calendar-container">
      <BigCalendar events={todos} />
    </div>
  );
};

export default MyCalendar;
