import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  CardActions,
  IconButton,
  Typography,
} from "@material-ui/core";
import Like from "@material-ui/icons/Favorite";
import Unlike from "@material-ui/icons/FavoriteBorder";
import Person from "@material-ui/icons/Person";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";

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

const Feed = ({ posts, loggedInUser, deletePost, likePost, unlikePost }) => {
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
          {post.likes.find((like) => like === loggedInUser._id) ? (
            <IconButton
              color="secondary"
              component="span"
              onClick={() => unlikePost(loggedInUser._id, post._id)}
            >
              <Like />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              component="span"
              onClick={() => likePost(loggedInUser._id, post._id)}
            >
              <Unlike />
            </IconButton>
          )}
          {post.likes.length}
        </CardActions>
      </Card>
    ))
  );
};

export default Feed;
