import React, { useState } from 'react';
import DatePicker from 'react-date-picker'

const DatePickerWrap = ({ startDate, isOpen }) => {
  const [date, setDate] = useState(startDate);

  return (
    <div>
      <DatePicker
        isOpen={isOpen}
        onChange={date => setDate(date)}
        value={date}
      />
    </div>
  )
}

export default DatePickerWrap;