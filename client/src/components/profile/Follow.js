import React from "react";
import { GridList, GridListTile, Avatar, Typography } from "@material-ui/core";
import Person from "@material-ui/icons/Person";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "70%",
    marginTop: "20px",
    margin: "0 auto",
  },
  link: {
    textDecoration: "none",
  },
  gridList: {
    // alignContent:'center'
  },
}));

const Follow = (props) => {
  // console.log(props);
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={4} className={classes.gridList}>
        {props.people.map((person) => (
          <GridListTile key={person._id}>
            <Link to={`/user/${person._id}`} className={classes.link}>
              <Avatar>
                <Person />
              </Avatar>
              <Typography>{person.name}</Typography>
            </Link>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
};

export default Follow;
