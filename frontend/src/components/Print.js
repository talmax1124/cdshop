import React from "react";
import { Select, InputLabel, FormControl, MenuItem } from "@mui/material";

import { makeStyles } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Print = ({ printAs }) => {
  const classes = useStyles();
  const [type, setType] = React.useState("");
  const handleChange = (event) => {
    setType(event.target.value);
    printAs(event);
  };
  return (
    <FormControl variant="outlined" className={classes.formControl}>
      <InputLabel id="label">Print</InputLabel>
      <Select
        labelId="label"
        id="select"
        onChange={handleChange}
        label="Print"
        autoWidth
        value={type}
      >
        <MenuItem value={"pdf"}>Print as pdf</MenuItem>
        <MenuItem value={"excel"}>Print as excel</MenuItem>
      </Select>
    </FormControl>
  );
};

export default Print;
