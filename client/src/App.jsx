import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";
import PopupWindow from "./Components/PopupWindow";
import axios from "axios";

const Container = styled("div")({
  height: "100vh",
  backgroundImage:
    "url(https://www.toptal.com/designers/subtlepatterns/uploads/leaves.png)",
  // backgroundSize: "cover",
  // backgroundPosition: "center",
  backgroundRrepeat: "repeat",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

// const AppBar = styled("div")({
//   position: sticky,
//   top: 0,
// });

const Form = styled("form")({
  width: "80%",
  maxWidth: "600px",
  padding: "20px",
  backgroundColor: "white",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
});

const Input = styled(TextField)({
  margin: "10px 0",
});

const Submit = styled(Button)({
  margin: "20px 0",
});

const days = [
  "1-(27/01/2024)",
  "2-(29/01/2024)",
  "3-(30/01/2024)",
  "4-(31/01/2024)",
  "5-(01/02/2024)",
];
const shifts = ["Shift-1", "Shift-2"];

function App() {
  const [link, setLink] = useState("");
  const [day, setDay] = useState(1);
  const [shift, setShift] = useState("Shift-1");
  const [open, setOpen] = useState(false);

  const [obData, setObData] = useState({
    totalMCQ: 0,
    totalAnsweredMCQ: 0,
    correctCountMCQ: 0,
    incorrect: 0,
    mathSA: 0,
    phySA: 0,
    chemSA: 0,
    finalResult: 0,
    mathMCQ: 0,
    phyMCQ: 0,
    cheMCQ: 0,
    attemMathSA: 0,
    attemPhySA: 0,
    attemChemSA: 0,
    attemtedArray: [0, 0, 0],
  });

  const getData = async () => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/v1/home", {
        url: link,
        day: day[0],
        shift: (shift =="Shift-1")?0:1,
      });
      setObData(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the input values
    await getData();

    setOpen(true);
    // console.log(link, day, shift);
  };

  return (
    <>
      <Container>
        <AppBar className="sticky top-0 " sx={{ backgroundColor: "#9fcf3a" }}>
          <Toolbar>
            <Typography variant="h6">Jee Ans Checker</Typography>
          </Toolbar>
        </AppBar>
        <Form onSubmit={handleSubmit}>
          <Input
            label="Link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            required
          />
          <Input
            label="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            select
            fullWidth
            required
          >
            {days.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Input>
          <Input
            label="Shift"
            value={shift}
            onChange={(e) => setShift(e.target.value)}
            select
            fullWidth
            required
          >
            {shifts.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Input>
          <Submit
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#9fcf3a" }}
          >
            Submit
          </Submit>
        </Form>
      </Container>
      <PopupWindow
        open={open}
        setOpen={setOpen}
        objectData={obData}
        setObData={setObData}
      />
    </>
  );
}

export default App;
