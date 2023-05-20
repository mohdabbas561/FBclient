import '../editDetails/editdetails.css';
// import {
//     Cancel
// } from "@material-ui/icons";
// import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Topbar from "../../components/topbar/Topbar";
// import { useParams } from "react-router";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
// import { useParams } from "react-router-dom";
// import { loginCall } from "../../apiCalls";


export default function EditDetails() {

    const mystyle = {
        backgroundColor:"#3f81d8" ,
        color:" white",
        border: "none",
        padding: "8px 13px",
        borderRadius: "7px",
        cursor: "pointer",
        marginTop: "10px",
        display: "flex",
        float:"left",
        marginLeft: "44px",
        
    }
    const mystyle1 = {
        backgroundColor:"#3f81d8" ,
        color:" white",
        border: "none",
        padding: "8px 13px",
        borderRadius: "7px",
        cursor: "pointer",
        marginTop: "10px",
    }

    const [user, setUser] = useState({});
    const { user: currentUser } = useContext(AuthContext);
    const username = useRef();
    // const username = useParams().username;

    // const { isFetching, dispatch } = useContext(AuthContext);

    const name = useRef();
    const email = useRef();
    const password = useRef();
    const desc = useRef({});
    const city = useRef({});
    const gender = useRef();
    const relationship = useRef();
    const [file, setFile] = useState(null);
    const [modal, setModal] = useState(false);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //       const res = await axios.get(`/users?username=${username}`);
    //       setUser(res.data)
    //     };
    //     fetchUser();
    //   }, [username]);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?username=${currentUser.username}`);
            setUser(res.data);
            // console.log(res.data)
        };
        fetchUser();
    }, [currentUser.username]);

    const toggleModal = () => {
        setModal(!modal);
      };
    
      if(modal) {
        document.body.classList.add('active-modal')
      } else {
        document.body.classList.remove('active-modal')
      }

    const UID = currentUser._id;
    const Password = user.password;
    // console.log(password.current.value )
    console.log(Password)
    const handleClick = async (e) => {
        const userCredential =
        {
            userId: UID,
            // password: password.current.value||user?.password,
            name: name.current.value || user.name,
            email: email.current.value || user.email,
            desc: desc.current.value || user.desc,
            city: city.current.value || user.city,
            gender: gender.current.value || user.gender,
            relationship: relationship.current.value || user.relationship
        }
        try {
            console.log(userCredential)
            const res = axios.put(`/users/${currentUser._id}`, userCredential);
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    };

    const submitHandler = (e) => {
        e.preventDefault();
        const newimg = {
            userId: currentUser._id,
            // password: user?.password,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newimg.coverPicture = fileName;
            console.log(newimg);
            console.log(newimg.coverPicture);

            try {
                axios.post("/upload", data);
                // const res = axios.put(`/users/${currentUser._id}`, newimg);
                //    window.location.reload();    
                // console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            axios.put(`/users/${currentUser._id}`, newimg);
            // axios.put(`/users/${currentUser._id}`, newimg.coverPicture);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };
    const submitHandler2 = (e2) => {
        e2.preventDefault();
        const newimg = {
            userId: currentUser._id,
            // password: currentUser.password
            // password.current.value,
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newimg.profilePicture = fileName;
            console.log(newimg);
            console.log(newimg.profilePicture);
            try {
                axios.post("/upload", data);
            } catch (err) {
                console.log(err)
            }
        }
        try {
            axios.put(`/users/${currentUser._id}`, newimg);
            // axios.put(`/users/${currentUser._id}`, newimg.profilePicture);
            window.location.reload();
        } catch (err) {
            console.log(err)
        }
    };

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log(currentUser.coverPicture);
    return (
        <>
            <div className="rr">

                <Topbar />
            </div>
            <div className="container">

                

                <div className="editform">
                    <h2>Edit Your Details</h2>
                    <form className="edtimg" onSubmit={submitHandler}>
                        <div className="edtimg">
                            <label htmlFor="file">
                                <img
                                    className="profileCoverImgs"
                                    src={
                                        user?.coverPicture
                                            ? PF + user?.coverPicture
                                            : PF + "person/noCover.jpg"
                                    }
                                    alt=""
                                />
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </label>
                        </div>
                        {/* <div classname="up1"> */}
                        <button classname="up1" type="submit" style = {mystyle}>
                            Upload CoverPic
                        </button>
                        {/* </div> */}
                    </form>
                    <form className="edtimg3" onSubmit={submitHandler2}>
                        <div className="edtimg" >
                            <label htmlFor="file2">
                                <img
                                    className="profileUserImgs"
                                    src={
                                        user?.profilePicture
                                            ? PF + user?.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                />
                                <input
                                    style={{ display: "none" }}
                                    type="file"
                                    id="file2"
                                    accept=".png,.jpeg,.jpg"
                                    onChange={(e2) => setFile(e2.target.files[0])}
                                />
                            </label>
                        </div>
                        <div >
                            <button classname="upload2" type="submit" style={mystyle1}>
                                Upload DP
                            </button>
                        </div>
                    </form>
                    <form className="form2" onClick={handleClick}>
                        <input
                            placeholder={!user?.username ? "Username : " : user?.username}
                            ref={username}
                            className="txtfield"
                            disabled
                            style = {{display:"none"}}
                        />

                        <input
                            placeholder={!user?.name ? "Name : " : user?.name}
                            ref={name}
                            className="txtfield"
                        />
                        <input
                            placeholder={!user?.email ? "Email : " : user?.email}
                            ref={email}
                            className="txtfield"
                            type="email"
                            disabled
                            style = {{display:"none"}}
                        />
                        <input
                            placeholder= {!currentUser.password?"Enter Password" :currentUser.password}
                            ref={password}
                            disabled
                            className="txtfield"
                            type="password"
                            minLength="6"
                            style = {{display:"none"}}

                        />
                        <input
                            placeholder={!user?.desc ? "About You : " : user?.desc}
                            ref={desc}
                            className="txtfield"
                        />
                        <input
                            placeholder={!user?.city ? "City : " : user?.city}

                            ref={city}
                            className="txtfield"
                        /> <input
                            placeholder={!user?.gender ? "Gender : " : user?.gender}

                            ref={gender}
                            className="txtfield"
                        /> <input
                            placeholder={!user?.relationship ? "Relationship : " : user?.relationship}

                            ref={relationship}
                            className="txtfield"
                        />
                        <input type="Submit"
                            className="btn"
                            onClick={toggleModal}

                        />

                    </form>
                </div>
                {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
              <pre>          </pre>
              <pre>          </pre>
            <pre>Profile Updated   </pre>
            <br />
            <br />
          </div>
        </div>
      )}
            </div>

        </>
    )
}
