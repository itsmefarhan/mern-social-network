import React from "react";
import { CardActions, Input, Avatar } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  form: {
    width: "80%",
    margin: "10px auto",    
  },
}));

const Comment = () => {
    const classes = useStyles()
  return (
    <CardActions>
      <Avatar>
        <Person />
      </Avatar>
      <Input
        className={classes.form}
        placeholder="Write something..."
        // value={text}
        // onChange={(e) => setText(e.target.value)}
      />
    </CardActions>
  );
};

export default Comment;
