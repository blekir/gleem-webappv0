import React from "react";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import { makeid } from "utils";

const Dropdown = ({ name, value, setValue, items, width }) => {
  const _id = makeid(5);
  return (
    <FormControl id={_id} className="ring-0">
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={_id}
        inputProps={{ id: _id }}
        value={value}
        label={name}
        onChange={(e) => setValue(e.target.value)}
        size="small"
        sx={{ mt: "5px", width: width !== undefined ? width : "120px" }}
      >
        {items.map((item, index) => {
          return (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
