import React from "react";
import { Grid, TextField, Button, Card, CardContent } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { useEffect } from "react";
import { changePassword } from "../../../../component/Redux/actions/profile";

const ChangePasswordForm = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();

  const changePasswordFormHandler = (e) => {
    e.preventDefault();

    dispatch(changePassword(oldPassword, newPassword));
  };

  const { loading, message } = useSelector((state) => state.profile);

  useEffect(() => {
    if (message) {
      setOldPassword("");
      setNewPassword("");
    }
  }, [dispatch, message]);

  return (
    <Grid>
      <Card style={{ maxWidth: 2050, padding: "20px 5px", margin: "2 auto" }}>
        <CardContent>
          <form onSubmit={changePasswordFormHandler}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter your old password"
                  type="password"
                  label="Old Password"
                  variant="outlined"
                  fullWidth
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </Grid>

              <Grid xs={12} sm={6} item>
                <TextField
                  placeholder="Enter your new password"
                  label="New Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ChangePasswordForm;
