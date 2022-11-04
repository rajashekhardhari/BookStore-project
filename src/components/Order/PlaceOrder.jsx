import { Button, Paper } from "@mui/material";
import React from "react";
import './PlaceOrder.css'

function PlaceOrder(props) {
  return (
    <div style={{margin:"0 auto"}}>
      <Paper
       
        elevation={20}
        className="place_order_paper"
      >
        <Button onClick={()=>{
            props.history.push({
                pathname:"/dashHome"
            })
        }} variant="contained">DashBoard</Button>
      </Paper>
    </div>
  );
}

export default PlaceOrder;
