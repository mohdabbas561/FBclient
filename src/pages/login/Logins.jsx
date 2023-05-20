
import React, {
  useRef,
  useState
} from "react";
import { useContext } from "react";
import "../login/Login.css";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Navbar from "../../components/Navbar/navbar";
import axios from "axios";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [Error, setError] = useState(null);

  // const Errorwe ={};
  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/login",
        { email: email.current.value, password: password.current.value });
      // setError(null)
    } catch (error) {
      //  setError=error.response.data;
      console.log(error.response.data)
      setError(error.response.data);
      setOpen(true);
    }
    // if (res) {
    //   console.log(error)

    //   setOpen(true);
    // }
    // else {
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  }

  //   try {
  //     const { res } = axios.post("/auth/login", { email: email.current.value, password: password.current.value }
  //     );
  //     // dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

  //   } catch (error) {
  //     setError(error.response.data);
  //     setOpen(true);
  //   dispatch({ type: "LOGIN_FAILURE", payload: error });
  //   }
  // };
  return (
    <>
      <Navbar />
      <div className="containerlogin">
        <div className="loginimage">
          <img src="assets\f_images\formbg.jpg" alt="text" />
        </div>
        <div className="form">
          <h2>Please Login</h2>
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="txtfieldlogin"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="txtfieldlogin"
              ref={password}
            />

            <button className="lbtn" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            {/* <h3>
              {err && <span className="error-message">{err}</span>}
            </h3> */}
            <h3 className="alreadymember">
              Not a Member? Please <a className="href" href="./register">Signup</a>
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
            {Error && <p>{Error}</p>}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
        {Error && <p>{Error}</p>}
      </div>
      {/* {Error && <p>{Error}</p>} */}
    </>
  );
}