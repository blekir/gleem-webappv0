import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
} from '@mui/material';
import React from 'react';
import { makeid } from 'utils/globalUtils';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 300,
    },
  },
};

const CheckDropdown = ({ title, value, setValue, items }) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120, width: 300 }}>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="checkpointSelect"
          inputProps={{ id: () => makeid(5) }}
          value={value}
          label="lora"
          // onChange={(event) => setValue(event.target.value)}
          labelStyle={{ color: '#000' }}
          sx={{
            height: '40px',
          }}
          renderValue={() => items.filter((item) => item.selected).length}
          multiple
          MenuProps={MenuProps}
        >
          {items.map((model, index) => {
            return (
              <MenuItem key={index} value={model.name.split('.')[0]}>
                <Checkbox
                  onClick={(event) =>
                    setValue(index, event.target.checked, items[index].strength)
                  }
                  checked={items[index].selected}
                />
                <ListItemText primary={model.name.split('.')[0]} />
                <TextField
                  type="number"
                  margin="normal"
                  id="extraLoraStrength"
                  label="strength"
                  name="strength"
                  value={items[index].strength}
                  onChange={(e) =>
                    setValue(index, items[index].selected, e.target.value)
                  }
                  className="ring-0"
                  sx={{ width: '70px' }}
                  size="small"
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </>
  );
};

export default CheckDropdown;
