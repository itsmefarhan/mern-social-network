import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Avatar,
  Divider,
  IconButton,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/authContext";
import { UserContext } from "../../context/user/userContext";
import { PostContext } from "../../context/post/postContext";
import Follow from "../../components/profile/Follow";
import Feed from "../../components/post/Feed";

const useStyles = makeStyles(() => ({
  paper: {
    margin: "0 auto",
    width: "70%",
    padding: "20px",
  },
  link: {
    textDecoration: "none",
  },
  tabs: {
    marginBottom: "10px",
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const { loggedInUser, deleteUser } = useContext(AuthContext);
  const { user, getUser, follow, unfollow } = useContext(UserContext);
  const { profilePosts, posts, deletePost } = useContext(PostContext);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (e, val) => {
    setTabValue(val);
  };

  const { id } = props.match.params;

  useEffect(() => {
    getUser(id);
    profilePosts(id);
    // eslint-disable-next-line
  }, []);

  const handleDelete = () => {
    let permission = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (permission) {
      deleteUser(id);
      props.history.push("/login");
    }
  };

  return (
    user && (
      <Paper className={classes.paper} elevation={5}>
        <Typography variant="h6">Profile</Typography>
        <Divider />
        <List>
          <ListItem>
            <ListItemAvatar>
              <Avatar src={user.avatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
            <ListItemSecondaryAction>
              {loggedInUser && loggedInUser._id === user._id ? (
                <>
                  <Link to={`/user/edit/${user._id}`} className={classes.link}>
                    <IconButton color="primary">
                      <Edit />
                    </IconButton>
                  </Link>

                  <IconButton onClick={handleDelete}>
                    <Delete color="error" />
                  </IconButton>
                </>
              ) : user.followers.some(
                  (follower) => follower._id === loggedInUser._id
                ) ? (
                <Button
                  onClick={() => unfollow(loggedInUser._id, user._id)}
                  variant="contained"
                  color="secondary"
                >
                  UNFOLLOW
                </Button>
              ) : (
                <Button
                  onClick={() => follow(loggedInUser._id, user._id)}
                  variant="contained"
                  color="primary"
                >
                  FOLLOW
                </Button>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary={user.about}
              secondary={`Joined on ${new Date(user.createdAt).toDateString()}`}
            />
          </ListItem>
        </List>
        <Divider />
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
          indicatorColor="primary"
          className={classes.tabs}
        >
          <Tab label="Posts" />
          <Tab label="Following" />
          <Tab label="Followers" />
        </Tabs>
        {tabValue === 0 && (
          <Feed
            posts={posts}
            loggedInUser={loggedInUser}
            deletePost={deletePost}
          />
        )}
        {tabValue === 1 && <Follow people={user && user.following} />}
        {tabValue === 2 && <Follow people={user && user.followers} />}
      </Paper>
    )
  );
};

export default Profile;
