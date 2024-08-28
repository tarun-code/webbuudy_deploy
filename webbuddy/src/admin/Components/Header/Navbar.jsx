import React from "react";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { useStyles } from "./HeaderStyles";

import MenuIcon from "@material-ui/icons/Menu";

export default function Navbar({ handleDrawerOpen }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" mb={4}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logo}>
          {"Web Buddy"}
        </Typography>
        <Hidden smDown>
          <Box style={{ display: "flex" }}></Box>
        </Hidden>
        <Hidden mdUp>
          <IconButton color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}
