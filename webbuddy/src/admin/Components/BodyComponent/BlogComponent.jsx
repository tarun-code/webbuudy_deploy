import * as React from "react";

import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";
import Button from "@mui/material/Button";

import { styled } from "@mui/material/styles";

import { tableCellClasses } from "@mui/material/TableCell";

import { Grid, TextField } from "@material-ui/core";

import Modal from "@mui/material/Modal";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import BlogForm from "./Forms/BlogForm";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlog,
  getAllBlog,
  updateBlog,
  deleteComment,
} from "../../../component/Redux/actions/blog";
import { useEffect } from "react";
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

function Row(props) {
  const [openn, setOpenn] = React.useState(false);
  const handleOpen = () => setOpenn(true);
  const handleClose = () => setOpenn(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [file, setFile] = useState("");
  const [editId, setEditId] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const dispatch = useDispatch();

  const updateHandler = (blogId, title, description, category, createdBy) => {
    handleOpen();
    setTitle(title);
    setDescription(description);
    setCategory(category);
    setCreatedBy(createdBy);
    setEditId(blogId);
  };
  const editHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("createdBy", createdBy);
    formData.append("file", file);
    dispatch(updateBlog(editId, formData));
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
  const deleteButtonHandler = (blogId) => {
    dispatch(deleteBlog(blogId));
  };

  const deleteCommentHandler = (blogId, commentId) => {
    dispatch(deleteComment(blogId, commentId));
  };

  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <Modal
        keepMounted
        open={openn}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Edit The Service
          </Typography>

          <form onSubmit={editHandler}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter Title"
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
                  placeholder=" Enter Description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder=" Enter Category"
                  label="Category"
                  variant="outlined"
                  fullWidth
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Grid>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder=" Enter Creator"
                  label="Creator"
                  variant="outlined"
                  fullWidth
                  required
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
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
                  disabled={props.loading}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
      <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell component="th" scope="row">
          {row.title}
        </StyledTableCell>
        <StyledTableCell align="right">{row.description}</StyledTableCell>
        <StyledTableCell align="right">{row.category}</StyledTableCell>
        <StyledTableCell align="right">{row.createdBy}</StyledTableCell>
        <StyledTableCell align="right">
          <Avatar
            alt={row?.title}
            src={row.poster.url}
            variant="square"
            sx={{ width: 100, height: 100, objectFit: "fill" }}
          />

          {/* <img src={row.poster.url} alt="" /> */}
        </StyledTableCell>
        <StyledTableCell align="right">
          {moment(row.createdAt).format("Do MMMM  YYYY,  dddd,  h:mm:ss a")}
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
                  row.description,
                  row.category,
                  row.createdBy
                )
              }
              isLoading={row.loading}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Comments
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Comments</StyledTableCell>
                    <StyledTableCell align="right">Date</StyledTableCell>
                    <StyledTableCell align="right">Action</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {row.comments.map((commentRow) => (
                    <StyledTableRow key={commentRow._id}>
                      <StyledTableCell component="th" scope="row">
                        {commentRow.name}
                      </StyledTableCell>
                      <StyledTableCell>{commentRow.comment}</StyledTableCell>
                      <StyledTableCell align="right">
                        {moment(commentRow.createdAt).format(
                          "Do MMMM  YYYY,  dddd,  h:mm:ss a"
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        <Tooltip title="Delete" sx={{ mt: 1 }}>
                          <IconButton
                            aria-label="delete"
                            color="secondary"
                            onClick={() =>
                              deleteCommentHandler(row._id, commentRow._id)
                            }
                            isLoading={row.loading}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </React.Fragment>
  );
}

const BlogComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const { blogs, loading, error, message } = useSelector((state) => state.blog);
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

    dispatch(getAllBlog());
  }, [dispatch, error, message]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper}>
          <h1>Blogs</h1>
          <Button
            variant="contained"
            onClick={() => setIsToggled(!isToggled)}
            sx={{ m: 2 }}
            color="success"
          >
            Add More
          </Button>

          {isToggled && <BlogForm />}
          <Table aria-label="collapsible table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell />
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Category</StyledTableCell>
                <StyledTableCell align="right">Created By</StyledTableCell>
                <StyledTableCell align="right">Image</StyledTableCell>
                <StyledTableCell align="right">Date</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {blogs &&
                blogs.map((row) => (
                  <Row
                    key={row._id}
                    // updateHandler={updateHandler}
                    // deleteButtonHandler={deleteButtonHandler}
                    loading={loading}
                    row={row}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
export default BlogComponent;
