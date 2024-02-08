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

const days = [1, 2, 3, 4, 5];
const shifts = ["First", "Second"];

function App() {
  const [link, setLink] = useState("");
  const [day, setDay] = useState(1);
  const [shift, setShift] = useState("First");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Do something with the input values
    console.log(link, day, shift);
  };

  return (
    <Container>
      <AppBar className="sticky top-0 " sx={{ backgroundColor: "#9fcf3a" }}>
        <Toolbar>
          <Typography variant="h6">Brand Logo</Typography>
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
  );
}

export default App;
