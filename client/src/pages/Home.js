import React, { useEffect, useContext } from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import WhoToFollow from "../components/profile/WhoToFollow";
import AddPost from "../components/post/AddPost";
import { makeStyles } from "@material-ui/core/styles";

import { PostContext } from "../context/post/postContext";
import { AuthContext } from "../context/auth/authContext";
import Feed from "../components/post/Feed";

const useStyles = makeStyles(() => ({
  typo: {
    background: "white",
    padding: "10px",
    marginBottom: "20px",
    width: "94%",
    margin: "0 auto",
  },
}));

const Home = () => {
  const classes = useStyles();

  const { loggedInUser } = useContext(AuthContext);
  const {
    newsFeed,
    posts,
    deletePost,
    likePost,
    unlikePost,
    like,
    unlike,
  } = useContext(PostContext);

  useEffect(() => {
    newsFeed(loggedInUser._id);
    // eslint-disable-next-line
  }, [like, unlike]);

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <Typography variant="h5" className={classes.typo}>
            Newsfeed
          </Typography>
          <>
            <AddPost />

            <Feed
              posts={posts}
              loggedInUser={loggedInUser}
              deletePost={deletePost}
              likePost={likePost}
              unlikePost={unlikePost}
            />
          </>
        </Grid>
        <Grid item xs={12} sm={5}>
          <WhoToFollow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
