import axios from "axios";
// import { useRef } from "react";
// const res = useRef();

export const loginCall = async (userCredential, dispatch) => {

  try {
    const res = await axios.post("/auth/login", userCredential);
    dispatch(

      {
         type: "LOGIN_SUCCESS", payload: res.data
      }
    );
  } catch (error) {    
    console.log(error.response.data)
    dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
  }
};

// export const DetailUpdatecall = async (user) => {
//   try {
//     await axios.put("users/:", userCredential);
//   } catch (err) {
//     console.log(err)
//   };
// };
export const logoutCall = async () => {
  dispatchEvent({ type: "LOGOUT" });
};



// import axios from "axios";
// import { useRef } from "react";
// import { AuthContext } from "./context/AuthContext";

// export const loginCall = async (userCredential, dispatch) => {
//   dispatch({ type: "LOGIN_START" });
//   const  ref = useRef(initialValue)(AuthContext);

//   try {
//     const res = await axios.post("/auth/login", userCredential);
//     dispatch({ typr:ref, payload: res.data });
//   } catch (err) {
//     dispatch({ type: "LOGIN_FAILURE", payload: err });
//   }
// };
// // export const DetailUpdatecall = async (user) => {
// //   try {
// //     await axios.put("users/:", userCredential);
// //   } catch (err) {
// //     console.log(err)
// //   };
// // };
// export const logoutCall = async () => {
//   dispatchEvent({ type: "LOGOUT" });
// };











