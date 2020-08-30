import React, { useContext, useEffect } from "react";
import { Container, Grid } from "@material-ui/core";
import WhoToFollow from "../components/WhoToFollow";

const Home = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sm={7} />
        <Grid item xs={12} sm={5}>
          <WhoToFollow />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
