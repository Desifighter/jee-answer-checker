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
              Answered Questions:{" "}
              {objectData.totalAnsweredMCQ +
                objectData.attemMathSA +
                objectData.attemPhySA +
                objectData.attemChemSA}
            </Typography>
            <Typography variant="body1">
              Correct Answers:{" "}
              {objectData.correctCountMCQ +
                objectData.mathSA +
                objectData.chemSA +
                objectData.phySA}
            </Typography>
            <Typography variant="body1">
              Incorrect Answers(Only MCQ): {objectData.incorrect}
            </Typography>
            <Typography variant="body1">
              Your total score: {objectData.finalResult}
            </Typography>
          </Paper>
          <Typography variant="h6" gutterBottom>
            Subject-wise Scores:
          </Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body1">
              Attempted Que. in Math:{" "}
              {objectData.attemtedArray[0] + objectData.attemMathSA}
            </Typography>
            <Typography variant="body1">
              Maths Score:{" "}
              {objectData.mathSA * 4 +
                objectData.mathMCQ * 4 -
                (objectData.attemtedArray[0] - objectData.mathMCQ)}
            </Typography>

            <Typography variant="body1">
              Attempted Que. in Physics:
              {objectData.attemtedArray[1] + objectData.attemPhySA}
            </Typography>
            <Typography variant="body1">
              Physics Score:
              {objectData.phySA *4+
                objectData.phyMCQ * 4 -
                (objectData.attemtedArray[1] - objectData.phyMCQ)}
            </Typography>

            <Typography variant="body1">
              Attempted Que. in Chemistry:{" "}
              {objectData.attemtedArray[2] + objectData.attemChemSA}
            </Typography>
            <Typography variant="body1">
              Chemistry Score:{" "}
              {objectData.chemSA * 4 +
                objectData.cheMCQ * 4 -
                (objectData.attemtedArray[2] - objectData.cheMCQ)}
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
