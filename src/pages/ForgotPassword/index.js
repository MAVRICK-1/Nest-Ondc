import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../SignIn/style.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Snackbar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Typography,
} from "@mui/material";
import { getAuth, sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { app } from "../../firebase";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const auth = getAuth(app);

const forgotPassword = () => {
  const naviagtor = useNavigate();
  const navigate = useNavigate(); // Initialize useHistory
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog visibility

  const [showLoader, setShowLoader] = useState(false);
  const [error, setError] = useState("");

  const [formFields, setFormFields] = useState({email: ""});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const [InputErrors, setInputErrors] = useState({email: ""});

  // Email validation function
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  
  const onChangeField = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let errors = { ...InputErrors };

    if (name == "email") {
      errors.email = !validateEmail(value) ? "Invalid email address" : "";
    }

    setInputErrors(errors);
    setFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
    const isEmailValid = !errors.email;
    const isDisabled = !isEmailValid; 
    setIsDisabled(isDisabled);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleClose = () => {
    setOpenDialog(false); // Close the dialog
    navigate("/signIn"); // Redirect to sign-in page
  };

  const forgotPassword = async () => {
    const email = formFields.email;
    try {
       await sendPasswordResetEmail(auth, email)
        setSnackbarMessage('Reset email sent');
        setSnackbarOpen(true);
     } catch (error) {
        setError(error.message);
      }
  };

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Account Created Successfully!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Changed password successfully. You can now sign in.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>

      <section className="signIn mb-5">
        <div className="breadcrumbWrapper res-hide">
          <div className="container-fluid">
            <ul className="breadcrumb breadcrumb2 mb-0">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>Forgot Password</li>
            </ul>
          </div>
        </div>

        <div className="loginWrapper">
          <div className="card shadow">
          <Backdrop
              sx={{ color: "#000", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={showLoader}
              className="formLoader"
            >
              <CircularProgress color="inherit" />
            </Backdrop>

            <h3 className="text-center">Forgot Password</h3>
            <p  className="text-center">Enter registered email. We will send an email to reset password.</p>
            <form className="mt-4 w-100">
              <div className="form-group mb-4 w-100">
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  className="w-100"
                  placeholder="Email"
                  onChange={onChangeField}
                  value={formFields.email}
                  autoComplete="email"
                />
                {InputErrors.email && (
                  <Typography
                    variant="caption"
                    sx={{ color: "red", padding: "5px" }}
                  >
                    {InputErrors.email}
                  </Typography>
                )}
              </div>

              <div className="form-group mt-5 mb-4 w-100">
                <Button
                  disabled={isDisabled}
                  className="btn btn-g btn-lg w-100"
                  onClick={forgotPassword}
                >
                  Reset Password
                </Button>
              </div>

              <p className="text-center">
                Already have an account?
                <b>
                  <Link to="/signIn">Sign In</Link>
                </b>
              </p>
            </form>
          </div>
        </div>
      </section>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <Button color="secondary" size="small" onClick={handleCloseSnackbar}>
            Close
          </Button>
        }
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </>
  );
};

export default forgotPassword;
