import * as React from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import moment from "moment";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const Comment = (props) => {
  return (
    <Typography>
      <KeyboardArrowRightIcon />
      <h4>
        {props.name} -
        {moment(props.createdAt).format("Do MMMM  YYYY,  dddd,  h:mm:ss a")}
      </h4>
      <br />
      {props.comment} <br /> <Divider variant="middle" />
    </Typography>
  );
};

export default Comment;
