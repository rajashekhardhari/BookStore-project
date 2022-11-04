import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UserRegistrationService from "../../../services/UserRegistrationService";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(props.verify);
  const [otp, setOtp] = React.useState("");
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const verifyHandler = () => {
    console.log(otp)
    UserRegistrationService.verifyOtp(otp)
      .then((response) => {
        alert(response.data.message)
        props.history.push(({
            pathname:"/login"
        }))
      })
      .catch((error) => {
        alert(error.response.data.data)
      });
  };

  const otpHandler = (e) => {
    setOtp(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Click to Enter Otp
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Otp</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Enter the Otp</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Otp"
            type="text"
            onChange={otpHandler}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={verifyHandler}>Verify</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
