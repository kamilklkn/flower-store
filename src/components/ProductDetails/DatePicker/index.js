import React, { useState } from 'react';
import DatePicker from 'react-date-picker'

const DatePickerWrap = ({ startDate }) => {
  const [date, setDate] = useState(startDate);

  return (
    <div>
      <DatePicker
        onChange={date => setDate(date)}
        value={date}
      />
    </div>
  )
}

export default DatePickerWrap;