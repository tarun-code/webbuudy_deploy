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
import moment from "moment";
import Typography from "@mui/material/Typography";

import { useState } from "react";
import TestimonialForm from "./Forms/TestimonialForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteTestimonial,
  getAllTestimonials,
  updateTestimonial,
} from "../../../component/Redux/actions/testimonial";
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

const TestimonialsComponent = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState("");
  const [editId, setEditId] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  const { testimonials, error, message, loading } = useSelector(
    (state) => state.testimonial
  );

  const [isToggled, setIsToggled] = useState(false);

  const updateHandler = (id, name, post, comment, from, category) => {
    handleOpen();

    setName(name);
    setPost(post);

    setCategory(category);
    setFrom(from);
    setComment(comment);
    setEditId(id);
  };

  const editHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("post", post);
    formData.append("category", category);
    formData.append("from", from);
    formData.append("comment", comment);
    formData.append("file", file);
    dispatch(updateTestimonial(editId, formData));
    handleClose();
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

  const deleteButtonHandler = (id) => {
    dispatch(deleteTestimonial(id));
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

    dispatch(getAllTestimonials());
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
                Edit The Testimonial
              </Typography>

              <form onSubmit={editHandler}>
                <Grid container spacing={1}>
                  <Grid xs={12} sm={6} item>
                    <TextField
                      placeholder="Enter Name"
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
                      placeholder=" Enter Post"
                      label="Post"
                      variant="outlined"
                      fullWidth
                      required
                      value={post}
                      onChange={(e) => setPost(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder=" Enter Category"
                      label="Category"
                      variant="outlined"
                      fullWidth
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      placeholder="Enter From"
                      label="From"
                      variant="outlined"
                      fullWidth
                      required
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Comment"
                      multiline
                      rows={4}
                      placeholder="Comment must be at least 20 characters "
                      variant="outlined"
                      fullWidth
                      required
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
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
                      <img
                        src={imagePrev}
                        alt="Image Prev"
                        boxSize="64"
                        objectFit={"contain"}
                      />
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

          <h1>Testimonials</h1>
          <Button
            variant="contained"
            onClick={() => setIsToggled(!isToggled)}
            sx={{ m: 2 }}
            color="success"
          >
            Add More
          </Button>

          {isToggled && <TestimonialForm />}

          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Post</StyledTableCell>
                <StyledTableCell align="right">Comment</StyledTableCell>
                <StyledTableCell align="right">From</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">image</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {testimonials &&
                testimonials.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.post}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.comment}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.from}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.category}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {moment(row.createdAt).format(
                        "Do MMMM  YYYY,  dddd,  h:mm:ss a"
                      )}
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
                              row.name,
                              row.post,
                              row.comment,
                              row.from,
                              row.category
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

export default TestimonialsComponent;
