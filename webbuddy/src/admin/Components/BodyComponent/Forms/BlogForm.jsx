import React from "react";
import { Grid, TextField, Button, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createBlog } from "../../../../component/Redux/actions/blog";
import { useEffect } from "react";
import { Avatar } from "@mui/material";

const BlogForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [file, setFile] = useState("");
  const [imagePrev, setImagePrev] = useState("");
  const dispatch = useDispatch();

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setFile(file);
    };
  };

  const createFormHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("createdBy", createdBy);
    formData.append("file", file);
    dispatch(createBlog(formData));
  };

  const { loading, message } = useSelector((state) => state.blog);

  useEffect(() => {
    if (message) {
      setTitle("");
      setDescription("");
      setCategory("");
      setCreatedBy("");
    }
  }, [dispatch, message]);

  return (
    <Grid>
      <Card style={{ maxWidth: 2050, padding: "20px 5px", margin: "2 auto" }}>
        <CardContent>
          <form onSubmit={createFormHandler}>
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
                  disabled={loading}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogForm;
