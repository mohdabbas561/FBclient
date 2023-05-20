import './register.css';
import React, { useState } from "react";
import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Navbar from "../../components/Navbar/navbar";


export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [Error, setError] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const res = await axios.post("/auth/register", user);
        // if (!res.data=={}) {

          setError("Signup Successful");
          setOpen(true);
          history.push("/Logins");
        

      } catch (error) {
        console.log(error.response.data)
        setError(error.response.data);
        setOpen(true);
      }
    }
  };
  return (

    <>
      <Navbar />
      <div className="container">

        <div className="formbg">
          <img src=
            "assets\f_images\formbg.jpg"
            alt="text" />
        </div>
        <div className="form">
          <h2>Please Register</h2>
          <form onSubmit={handleClick}>
            <input
              placeholder="Enter Email"
              required
              ref={email}
              className="txtfield"
              type="email"
            />
            <input
              placeholder="Enter UserName"
              required
              ref={username}
              className="txtfield"
            />
            <input
              placeholder="Enter Password"
              required
              ref={password}
              className="txtfield"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Confirm Password"
              required
              ref={passwordAgain}
              className="txtfield"
              type="password"
            />

            <input type="Submit"
              className="btn"
            />

            <h3 className="alreadymember">
              Already a Member? Please <a className="href" href="./Logins">Login</a>
            </h3>
          </form>
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p>{Error}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>

  );
}