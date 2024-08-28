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
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Grid, TextField } from "@material-ui/core";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import Typography from "@mui/material/Typography";

import { useState } from "react";
import ServicesForm from "./Forms/ServicesForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteServices,
  getAllServices,
  updateServices,
} from "../../../component/Redux/actions/services";
import { toast } from "react-hot-toast";
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

const ServicesComponent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");
  const [editId, setEditId] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const dispatch = useDispatch();

  const updateHandler = (id, title, description) => {
    handleOpen();
    setTitle(title);
    setDescription(description);
    setEditId(id);
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
  const editHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    formData.append("file", file);
    dispatch(updateServices(editId, formData));
    handleClose();
  };
  const deleteButtonHandler = (id) => {
    dispatch(deleteServices(id));
  };

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  const { services, message, error, loading } = useSelector(
    (state) => state.service
  );

  const [isToggled, setIsToggled] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }

    dispatch(getAllServices());
  }, [dispatch, error, message]);

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
                Edit The Service
              </Typography>

              <form onSubmit={editHandler}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Title must be at least 4 characters"
                      label=" Title"
                      variant="outlined"
                      fullWidth
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Grid>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder=" Description must be at least 20 characters"
                      label="Description"
                      variant="outlined"
                      fullWidth
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12}>
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
                        sx={{ width: 100, height: 100, objectFit: "fill" }}
                      />

                      // <img src={imagePrev} boxSize="64" objectFit={"contain"} />
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

          <h1>Services</h1>
          <Button
            variant="contained"
            onClick={() => setIsToggled(!isToggled)}
            sx={{ m: 2 }}
            color="success"
          >
            Add More
          </Button>

          {isToggled && <ServicesForm />}

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>

                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services &&
                services.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.description}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Avatar
                        alt={row?.title}
                        src={row.image.url}
                        variant="square"
                        sx={{ width: 100, height: 100, objectFit: "fill" }}
                      />

                      {/* <img src={row.image.url} alt="" /> */}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Tooltip title="Delete" sx={{ mt: 1 }}>
                        <IconButton
                          aria-label="delete"
                          color="secondary"
                          onClick={() => deleteButtonHandler(row._id)}
                          isLoading={row.loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit" sx={{ mt: 1 }}>
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() =>
                            updateHandler(
                              row._id,
                              row.title,
                              row.description
                              // row.image.url
                            )
                          }
                          isLoading={row.loading}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default ServicesComponent;
