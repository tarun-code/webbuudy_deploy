import { Group } from "@mui/icons-material";
import HandymanIcon from "@mui/icons-material/Handyman";
import CollectionsIcon from "@mui/icons-material/Collections";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import WorkIcon from "@mui/icons-material/Work";
import FeedIcon from "@mui/icons-material/Feed";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";

import moment from "moment";
import { getAllTestimonials } from "../../../../component/Redux/actions/testimonial";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "../../../../component/Redux/actions/services";
import { getAllProject } from "../../../../component/Redux/actions/project";
import { getAllNews } from "../../../../component/Redux/actions/news";
import { getAllGallery } from "../../../../component/Redux/actions/gallery";
import { getAllContacts } from "../../../../component/Redux/actions/contact";
import { getAllBlog } from "../../../../component/Redux/actions/blog";
import { loadUser } from "../../../../component/Redux/actions/user";
import Loader from "../../../../component/Loader/Loader";

const Dashboard = () => {
  const { testimonials } = useSelector((state) => state.testimonial);
  const { loading } = useSelector((state) => state.user);
  const { projects } = useSelector((state) => state.project);
  const { blogs } = useSelector((state) => state.blog);
  const { news } = useSelector((state) => state.news);
  const { gallery } = useSelector((state) => state.gallery);
  const { services } = useSelector((state) => state.service);
  const { contact } = useSelector((state) => state.contact);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTestimonials());
    dispatch(getAllServices());
    dispatch(getAllProject());
    dispatch(getAllNews());
    dispatch(getAllGallery());
    dispatch(getAllContacts());
    dispatch(getAllBlog());
    dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(3,1fr)",
            gridAutoRows: "minmax(100px, auto)",
            gap: 3,
            textAlign: "center",
            flexDirection: "column",
          }}
        >
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Testimonials</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Group sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h2">
                {testimonials && testimonials.length}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Projects</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <WorkIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h2">
                {" "}
                {projects && projects.length}{" "}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Blogs</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FeedIcon sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }} />
              <Typography variant="h2"> {blogs && blogs.length} </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total NewsLetter</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <NewspaperIcon
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h2"> {news && news.length} </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Gallery</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CollectionsIcon
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h2">
                {" "}
                {gallery && gallery.length}{" "}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Services</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HandymanIcon
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h2">
                {services && services.length}{" "}
              </Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4">Total Contacts</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ContactPageIcon
                sx={{ height: 100, width: 100, opacity: 0.3, mr: 1 }}
              />
              <Typography variant="h2">
                {" "}
                {contact && contact.length}{" "}
              </Typography>
            </Box>
          </Paper>

          {/* side data */}

          <Paper elevation={3} sx={{ p: 2, gridColumn: 3, gridRow: "1/4" }}>
            <Box>
              <Typography variant="h4"> Recently Added Blogs</Typography>
              <List>
                {blogs &&
                  blogs.slice(0, 4).map((value, i) => (
                    <Box key={value._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar alt={value?.title} src={value?.poster.url} />
                        </ListItemAvatar>

                        <ListItemText primary={` : ${value?.title} `} />
                        <ListItemText
                          primary={value?.name}
                          secondary={`Posted : ${moment(
                            value?.createdAt
                          ).fromNow()}`}
                        />
                      </ListItem>

                      {i !== 3 && <Divider variant="inset" />}
                    </Box>
                  ))}
              </List>
            </Box>
            <Divider sx={{ mt: 3, mb: 3, opacity: 0.7 }} />
            <Box>
              <Typography variant="h4">Recently Added Projects</Typography>
              <List>
                {projects &&
                  projects.slice(0, 4).map((value, i) => (
                    <Box key={value._id}>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar
                            alt={value?.title}
                            src={value?.poster.url}
                            variant="rounded"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={value?.title}
                          secondary={`Added: ${moment(
                            value?.createdAt
                          ).fromNow()}`}
                        />
                      </ListItem>
                      {i !== 3 && <Divider variant="inset" />}
                    </Box>
                  ))}
              </List>
            </Box>
          </Paper>
        </Box>
      )}
    </>
  );
};

export default Dashboard;
