import React, { useContext, useEffect, useState, Fragment } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
  Avatar,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/user/userContext";
import { AuthContext } from "../../context/auth/authContext";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles(() => ({
  heading: {
    padding: "20px",
    color: "dimgrey",
  },
}));

const WhoToFollow = () => {
  const classes = useStyles();
  const { loggedInUser } = useContext(AuthContext);
  const { follow } = useContext(UserContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const whoToFollow = async () => {
      try {
        const res = await axios.get(`/api/users/find`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    whoToFollow();
  }, [follow]);

  return users.length ? (
    <Fragment>
      <Paper elevation={3}>
        <Typography variant="h5" className={classes.heading}>
          Who To Follow
        </Typography>
        <List>
          {users.map((user) => (
            <ListItem key={user._id}>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={user.name} />
              <ListItemSecondaryAction>
                <Link to={`/user/${user._id}`}>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => follow(loggedInUser._id, user._id)}
                >
                  FOLLOW
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Fragment>
  ) : null;
};

export default WhoToFollow;
