import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@material-ui/core";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  // List,
  // ListItem,
  // ListItemButton,
  // ListItemIcon,
  // ListItemText,
  // styled,
  Tooltip,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";

import GroupAddIcon from "@mui/icons-material/GroupAdd";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CollectionsIcon from "@mui/icons-material/Collections";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";

import { NavLink } from "react-router-dom";
import { useStyles } from "./HeaderStyles";

import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../../component/Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import Loader from "../../../component/Loader/Loader";

export default function SidenavData({ handleDrawerClose }) {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const { user, message, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, message, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());

    // navigate("/");
  };
  const classes = useStyles();
  const listItemData = [
    {
      label: "Dashobard",
      link: "/admin/dashboard",
      icon: <DashboardIcon color="secondary" />,
    },
    {
      label: "Blogs",
      link: "/admin/blogs",
      icon: <NewspaperIcon color="secondary" />,
    },
    {
      label: "Services",
      link: "/admin/services",
      icon: <ImportantDevicesIcon color="secondary" />,
    },
    {
      label: "Gallery",
      link: "/admin/gallery",
      icon: <CollectionsIcon color="secondary" />,
    },
    {
      label: "Projects",
      link: "/admin/projects",
      icon: <LibraryAddCheckIcon color="secondary" />,
    },
    {
      label: "About",
      link: "/admin/about",
      icon: <AssignmentIndIcon color="secondary" />,
    },
    {
      label: "Testimonials",
      link: "/admin/testimonials",
      icon: <GroupAddIcon color="secondary" />,
    },
    {
      label: "Contacts",
      link: "/admin/contacts",
      icon: <ContactPhoneIcon color="secondary" />,
    },
    {
      label: "News Letter",
      link: "/admin/newsletter",
      icon: <ReceiptLongIcon color="secondary" />,
    },
  ];
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <List>
          {listItemData.map((item, i) => (
            <Button
              size="small"
              className={classes.navButton}
              onClick={() => handleDrawerClose()}
              key={i}
            >
              <ListItem
                exact
                component={NavLink}
                to={item.link}
                className={classes.navlinks}
                activeClassName={classes.activeNavlinks}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
              </ListItem>
            </Button>
          ))}

          <Divider />
          <Box
            sx={{
              mx: "auto",
              mt: 3,
              mb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Tooltip title={user?.name || ""}>
              <Avatar
                src={user?.avatar.url}
                sx={{ width: 100, height: 100, objectFit: "fill" }}
              />
            </Tooltip>
          </Box>
          <Box sx={{ textAlign: "center" }}>
            <Typography>{user?.name}</Typography>
            <Typography variant="body2">{user?.role || "role"}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
            <Typography variant="body2">{user?.about}</Typography>
            <Tooltip title="Logout" sx={{ mt: 1 }}>
              <IconButton color="secondary" onClick={() => logoutHandler()}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>

          {/* <Button
        variant="contained"
        color="secondary"
        onClick={() => logoutHandler()}
        endIcon={<LogoutIcon />}
      >
        Log Out
      </Button> */}
        </List>
      )}
    </>
  );
}
