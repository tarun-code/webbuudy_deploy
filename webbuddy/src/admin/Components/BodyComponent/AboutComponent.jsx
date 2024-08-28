import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import LockResetIcon from "@mui/icons-material/LockReset";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";

import { Grid, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { toast } from "react-hot-toast";
import { loadUser } from "../../../component/Redux/actions/user";
import {
  updateProfile,
  updateProfilePicture,
} from "../../../component/Redux/actions/profile";
import ChangePasswordForm from "./Forms/ChangePasswordForm";
import { Avatar, Tooltip } from "@mui/material";
import Loader from "../../../component/Loader/Loader";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AboutComponent = () => {
  const [isToggled, setIsToggled] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [file, setFile] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const { user } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const updateHandler = (name, email, about) => {
    handleOpen();
    setName(name);
    setEmail(email);
    setAbout(about);
  };
  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setFile(file);
    };
  };

  const updatePictureHandler = () => {
    handleOpenModal();
  };
  const editImageHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    dispatch(updateProfilePicture(formData));
    handleCloseModal();
  };

  const editHandler = (e) => {
    e.preventDefault();

    dispatch(updateProfile(name, email, about));
    handleClose();
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
    dispatch(loadUser());
    setIsToggled(false);
  }, [dispatch, error, message]);

  useEffect(() => {
    setIsToggled(false);
  }, [message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="keep-mounted-modal-title"
                variant="h6"
                component="h2"
              >
                Edit The About
              </Typography>

              <form onSubmit={editHandler}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter Nitle"
                      label=" Name"
                      variant="outlined"
                      fullWidth
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Grid>

                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder=" Enter Email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder=" Enter About"
                      label="About"
                      variant="outlined"
                      fullWidth
                      required
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={loading}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Modal>

          <h1>About</h1>

          {isToggled && <ChangePasswordForm />}
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>

                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">About</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user && (
                <StyledTableRow key={user._id}>
                  <StyledTableCell component="th" scope="row">
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{user.email}</StyledTableCell>
                  <StyledTableCell align="right">{user.about}</StyledTableCell>
                  <StyledTableCell align="right">
                    <Avatar
                      alt={user?.name}
                      src={user.avatar.url}
                      variant="square"
                      sx={{ width: 100, height: 100, objectFit: "fill" }}
                    />

                    {/* <img src={user.avatar.url} alt="" /> */}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Modal
                      keepMounted
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="keep-mounted-modal-title"
                      aria-describedby="keep-mounted-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="keep-mounted-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Change profile picture
                        </Typography>

                        <form onSubmit={editImageHandler}>
                          <Grid container spacing={1}>
                            <Grid xs={12} sm={6} item>
                              <TextField
                                label="Image"
                                accept="image/*"
                                placeholder="Enter File "
                                variant="outlined"
                                type="file"
                                required
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={changeImageHandler}
                              />
                              {imagePrev && (
                                <Avatar
                                  alt={""}
                                  src={imagePrev}
                                  variant="square"
                                  sx={{
                                    width: 100,
                                    height: 100,
                                    objectFit: "fill",
                                  }}
                                />

                                // <img
                                //   src={imagePrev}
                                //   boxSize="64"
                                //   objectFit={"contain"}
                                // />
                              )}
                            </Grid>

                            <Grid item xs={12}>
                              <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                              >
                                Submit
                              </Button>
                            </Grid>
                          </Grid>
                        </form>
                      </Box>
                    </Modal>
                    <Tooltip title="Update Picture" sx={{ mt: 1 }}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => updatePictureHandler()}
                        isLoading={loading}
                      >
                        <AddPhotoAlternateIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Password" sx={{ mt: 1 }}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => setIsToggled(!isToggled)}
                        isLoading={loading}
                      >
                        <LockResetIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Profile" sx={{ mt: 1 }}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() =>
                          updateHandler(user.name, user.email, user.about)
                        }
                        isLoading={user.loading}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default AboutComponent;
