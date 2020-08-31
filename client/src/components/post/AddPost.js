import React, { useState, useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Input,
  CardActions,
  IconButton,
  Button,
  FormControl,
} from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import Camera from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import { PostContext } from "../../context/post/postContext";
import { AuthContext } from "../../context/auth/authContext";

const useStyles = makeStyles(() => ({
  list: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "30px",
  },
  bg: {
    background: "#d8ecf0",
  },
  form: {
    width: "80%",
    margin: "0 auto",
    marginTop: "10px",
  },
  input: {
    display: "none",
  },
}));

const AddPost = () => {
  const classes = useStyles();

  const [text, setText] = useState("");

  const { loggedInUser } = useContext(AuthContext);
  const { createPost } = useContext(PostContext);

  const handleSubmit = () => {
    createPost(loggedInUser._id, { text });
    setText("");
  };

  return (
    <Card className={classes.list}>
      <CardHeader
        className={classes.bg}
        avatar={
          <Avatar>
            <Person />
          </Avatar>
        }
        title={loggedInUser.name}
      />
      <CardContent>
        <FormControl fullWidth>
          <Input
            className={classes.form}
            multiline
            rows={3}
            placeholder="Share your thoughts"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            accept="image/*"
            id="icon-button-file"
            type="file"
            className={classes.input}
          />
          <label htmlFor="icon-button-file" className={classes.form}>
            <IconButton color="secondary" component="span">
              <Camera />
            </IconButton>
          </label>
        </FormControl>
      </CardContent>
      <CardActions className={classes.bg}>
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          POST
        </Button>
      </CardActions>
    </Card>
  );
};

export default AddPost;
