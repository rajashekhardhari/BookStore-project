import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import Alert from "@mui/material/Alert";

// function TransitionLeft(props) {
//   return <Slide {...props} direction="left" />;
// }

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}

export default function DirectionSnackbar(props) {
  const [open, setOpen] = React.useState(true);
  const [transition, setTransition] = React.useState(undefined);

  // const handleOnClick = (Transition) => () => {
  //   setTransition(() => Transition);
  //   setOpen(true);
  // };

  React.useEffect(() => {
    setTransition(() => TransitionRight);
    setOpen(true);
  });

  const handleClose = () => {
    setOpen(false);
  };

  // const handleOnClick=()=>{
  //   setOpen(props.flag);
  // }

  return (
    <div>
       {/* <Button onClick={handleClick(TransitionLeft)}>Right</Button>
      <Button onClick={handleClick(TransitionUp)}>Up</Button>
      <Button onClick={handleClick(TransitionRight)}>Left</Button>
      <Button onClick={handleClick(TransitionDown)}>Down</Button>  */}

      <Snackbar
        open={open}
        onClose={handleClose}
        TransitionComponent={TransitionDown}
        message="I love snacks"
        key={transition ? transition.name : ""}
      >
        <Alert onClose={handleClose} severity={props.severity}>
          {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}
