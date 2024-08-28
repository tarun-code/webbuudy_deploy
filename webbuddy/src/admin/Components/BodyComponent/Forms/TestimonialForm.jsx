import React from "react";
import { Grid, TextField, Button, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createTestminial } from "../../../../component/Redux/actions/testimonial";
import { useEffect } from "react";
import { Avatar } from "@mui/material";

const TestimonialForm = () => {
  const [name, setName] = useState("");
  const [post, setPost] = useState("");
  const [category, setCategory] = useState("");
  const [from, setFrom] = useState("");
  const [comment, setComment] = useState("");
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
    formData.append("name", name);
    formData.append("post", post);
    formData.append("category", category);
    formData.append("from", from);
    formData.append("comment", comment);
    formData.append("file", file);

    dispatch(createTestminial(formData));
  };

  const { loading, message } = useSelector((state) => state.testimonial);
  useEffect(() => {
    if (message) {
      setName("");
      setPost("");
      setCategory("");
      setFrom("");
      setComment("");
    }
  }, [dispatch, message]);

  return (
    <Grid>
      <Card style={{ maxWidth: 2050, padding: "20px 5px", margin: "2 auto" }}>
        <CardContent>
          {/* <Typography gutterBottom variant="h5">
            Testimonials
          </Typography> */}

          <form onSubmit={createFormHandler}>
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
                  placeholder="Comment must be at least 20 characters"
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

export default TestimonialForm;
