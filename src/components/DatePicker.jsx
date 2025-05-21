import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker as DP } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DatePicker({ selectedDate, setSelectedDate, label }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DP
          label={label}
          value={selectedDate}
          onChange={(newValue) => setSelectedDate(newValue)}
          maxDate={dayjs()}
          format="DD/MM/YYYY"
          slotProps={{
            shortcuts: {
              items: [
                {
                  label: 'All',
                  getValue: () => dayjs(new Date(1989, 3, 28)),
                },
                {
                  label: 'today',
                  getValue: () => dayjs().startOf('day').add(1, 'second'),
                },
                {
                  label: '- 1d',
                  getValue: () => dayjs().subtract(1, 'day'),
                },
                {
                  label: '- 7 days',
                  getValue: () => dayjs().subtract(7, 'day'), // Subtract 7 days
                },
                {
                  label: '- 1 month',
                  getValue: () => dayjs().subtract(1, 'month'), // Subtract 1 month
                },
                {
                  label: '- 3 months',
                  getValue: () => dayjs().subtract(3, 'month'), // Subtract 3 months
                },
                {
                  label: '- 1 year',
                  getValue: () => dayjs().subtract(1, 'year'), // Subtract 1 year
                },
              ],
            },
          }}
          sx={{ paddingBottom: '15px' }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
