import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function PositionedSnackbar(props) {
  const [state, setState] = React.useState({
    open: true,
    vertical: "bottom",
    horizontal: "right",
  });

  const { vertical, horizontal, open } = state;

  

  const handleClose = () => {
    setState({ ...state, open: false });
  };

 

  return (
    <div>
      
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
