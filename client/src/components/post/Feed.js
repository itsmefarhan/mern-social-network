import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  IconButton,
  Divider,
  Typography,
} from "@material-ui/core";
import Comment from "@material-ui/icons/Comment";
import Favorite from "@material-ui/icons/Favorite";
import Person from "@material-ui/icons/Person";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import CommentForm from "../../components/post/Comment";

const useStyles = makeStyles(() => ({
  list: {
    width: "90%",
    margin: "0 auto",
    marginBottom: "30px",
  },
  bg: {
    background: "lightgrey",
  },
  form: {
    width: "80%",
    margin: "0 auto",
    marginTop: "10px",
  },
  input: {
    display: "none",
  },
  content: {
    margin: "20px 0px",
  },
}));

const Feed = ({ posts, loggedInUser, deletePost }) => {
  const classes = useStyles();

  return (
    posts &&
    posts.map((post) => (
      <Card className={classes.list} key={post._id}>
        <CardHeader
          className={classes.bg}
          avatar={
            <Avatar>
              <Person />
            </Avatar>
          }
          title={post.postedBy.name}
          subheader={new Date(post.createdAt).toDateString()}
          action={
            post.postedBy._id === loggedInUser._id && (
              <IconButton onClick={() => deletePost(post._id)}>
                <Delete color="error" />
              </IconButton>
            )
          }
        />
        <CardContent className={classes.content}>
          <Typography>{post.text}</Typography>
        </CardContent>
        <CardActions className={classes.bg}>
          <label htmlFor="icon-button-file">
            <IconButton color="secondary" component="span">
              <Favorite />
            </IconButton>
            {post.likes.length}
          </label>
          <label htmlFor="icon-button-file">
            <IconButton color="secondary" component="span">
              <Comment />
            </IconButton>
            {post.comments.length}
          </label>
          <Divider />
        </CardActions>
        <CommentForm />
      </Card>
    ))
  );
};

export default Feed;
