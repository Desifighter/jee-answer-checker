import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const PopupWindow = ({ objectData, open, setOpen, setObData }) => {
  // const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setObData({
      attempted: 0,
      mathTotalCorrect: 0,
      mathMcqIncorrect: 0,
      phyTotalCorrect: 0,
      phyMcqIncorrect: 0,
      chemTotalCorrect: 0,
      chemMcqIncorrect: 0,
      score: 0,
      mathMeNumericalAttempt:0,
      physicsMeNumericalAttempt:0,
      chemistyMeNumericalAttempt:0,

      mathMeMCQAttempt:0,
      physicsMeMCQAttempt:0,
      chemistyMeMCQAttempt:0,
    });
    setOpen(false);
  };

  // totalMCQ: 60,
  //   totalAnsweredMCQ: 38,
  //   correctCountMCQ: 9,
  //   incorrect: 29,
  //   mathSA: 0,
  //   phySA: 1,
  //   chemSA: 0,
  //   finalResult: 11,
  //   mathMCQ: 3,
  //   phyMCQ: 6,
  //   cheMCQ: 0,
  // attemMathSA: 0,
  //       attemPhySA: 3,
  //       attemChemSA: 4

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { bgcolor: "background.default", borderRadius: 4 } }} // Custom styling for centered and rounded popup
      >
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Overall Performance:
          </Typography>
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="body1">Total Questions: {90}</Typography>
            <Typography variant="body1">
              Answered Questions: {objectData.attempted}
            </Typography>
            <Typography variant="body1">
              Correct Answers:{" "}
              {objectData.mathTotalCorrect +
                objectData.phyTotalCorrect +
                objectData.chemTotalCorrect}
            </Typography>
            <Typography variant="body1">
              Incorrect Answers(Only MCQ):{" "}
              {objectData.mathMcqIncorrect +
                objectData.phyTotalCorrect +
                objectData.chemMcqIncorrect}
            </Typography>
            <Typography variant="body1">
              Your total score: {objectData.score}
            </Typography>
          </Paper>
          <Typography variant="h6" gutterBottom>
            Subject-wise Scores:
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">
              Attempted Que. in Math:{" "}
              {objectData.mathMeNumericalAttempt + objectData.mathMeMCQAttempt}
            </Typography>
            <Typography variant="body1">
              Maths Score:{" "}
              {objectData.mathTotalCorrect * 4 - objectData.mathMcqIncorrect}
            </Typography>

            <Typography variant="body1">
              Attempted Que. in Physics:
              {objectData.physicsMeNumericalAttempt +
                objectData.physicsMeMCQAttempt}
            </Typography>
            <Typography variant="body1">
              Physics Score:
              {objectData.phyTotalCorrect * 4 - objectData.phyMcqIncorrect}
            </Typography>

            <Typography variant="body1">
              Attempted Que. in Chemistry:{" "}
              {objectData.chemistyMeNumericalAttempt +
                objectData.chemistyMeMCQAttempt}
            </Typography>
            <Typography variant="body1">
              Chemistry Score:{" "}
              {objectData.chemTotalCorrect * 4 - objectData.chemMcqIncorrect}
            </Typography>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PopupWindow;
