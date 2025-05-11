import * as React from 'react';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FormHelperText } from '@mui/material';

export default function BasicDatePicker({value,onChangeFunction,field}) {
  Number.prototype.padLeft = function (base, chr) {
    var len = (String(base || 10).length - String(this).length) + 1;
    return len > 0 ? new Array(len).join(chr || '0') + this : this;
  }
  const formatDateTime = (value) => {
    let schedule
    if (value !== null) {
      var d = new Date(value.$d)
      schedule = [ d.getFullYear(),(d.getMonth() + 1).padLeft(),
      d.getDate().padLeft()].join('-')
        return schedule
    }
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer sx={{paddingTop:0}} components={['DatePicker']}>
        <DemoItem>
          <DatePicker defaultValue={dayjs("2023-02-29")} value={dayjs(value)} 
          onChange={(value)=> onChangeFunction(field,formatDateTime(value))} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}