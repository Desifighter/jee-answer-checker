import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function LandingPage() {
  const [link, setLink] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedShift, setSelectedShift] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted:", { link, selectedDay, selectedShift });
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <AppBar position="static">
        <Toolbar>
          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1 }}>
            <img src="your-logo.png" alt="Brand Logo" className="w-20 h-20" />
          </Box>
        </Toolbar>
      </AppBar>
      <div className="mt-8 flex flex-col items-center">
        <TextField
          label="Link URL"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          className="mb-4 w-full"
        />
        <Select
          labelId="day-select-label"
          id="day-select"
          value={selectedDay}
          onChange={(e) => setSelectedDay(e.target.value)}
          className="mb-4 w-full"
        >
          {[1, 2, 3, 4, 5].map((day) => (
            <MenuItem key={day} value={day}>
              Day {day}
            </MenuItem>
          ))}
        </Select>
        <RadioGroup
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
        >
          <FormControlLabel
            value="first"
            control={<Radio />}
            label="First Shift"
            className="mb-4"
          />
          <FormControlLabel
            value="second"
            control={<Radio />}
            label="Second Shift"
          />
        </RadioGroup>
        <Button variant="contained" onClick={handleSubmit} className="w-full">
          Submit
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
