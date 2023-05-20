import "./sidebar.css";
import {
  RssFeed,
  Chat,
  Person,
  BubbleChart,
  // PlayCircleFilledOutlined,
  // Group,
  // Bookmark,
  // HelpOutline,
  // WorkOutline,
  // Event,
  // School,
} from "@material-ui/icons";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CloseFriend from "../closeFriend/CloseFriend";
import { logoutCall } from "../../apiCalls";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";


export default function Sidebar() {
  const [AllUser, setAllUser] = useState([]);
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);

  const handleClick = async () => {
    logoutCall();
    try {
      window.location.reload(true);
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`);
      setUser(res.data);
      // console.log(res.data)
    };
    fetchUser();
  }, [currentUser.username]);
  // useEffect(() => {
  //   const fetchAllUser = async () => {
  //     const res23 = await axios.get("/users/All");
  //     console.log(res23)
  //     setAllUser(res23);
  //   };
  //   fetchAllUser();
  // }, []);

  const fetchAllUser = async () => {
    // console.log(AllUser == {})
    if (AllUser == false) {
      const res23 = await axios.get("/users/fetch");
      // console.log(res23.data)
      setAllUser(res23.data);
    }
    // console.log(AllUser)
  }
  fetchAllUser(); 
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link to="/" style={{ textDecoration: "none" }}>
              <RssFeed className="sidebarIcon" />
              <span className="sidebarListItemText">Feed</span>
            </Link>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <Link to="/Messenger" style={{ textDecoration: "none" }}>
              <span className="sidebarListItemText">Chats</span>
            </Link >
          </li>
          <li className="sidebarListItem">
          <Link to={`/profile/${user?.username}`} style={{ textDecoration: "none" , color: "black" }}>
            <Person className="sidebarIcon"/>
            <span className="sidebarListItemText">Profile</span>
            </Link>
          </li>
           <li className="sidebarListItem">
            <BubbleChart className="sidebarIcon" />
            {/* <span className="sidebarListItemText">Covid-19 Tracker</span> */}
            <a href="https://www.covid19india.org/" style={{ textDecoration: "none" , color: "black"}} target="blank">Covid-19 Tracker</a>
          </li>
          {/* <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li> */}
          {/* <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li> */}
        </ul>
        <button className="sidebarButton" onClick={handleClick}>Log out</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <span className= "userlist">User List</span>
          <br />
          <br />
            {AllUser.map(u => (
              <CloseFriend key={u._id} user={u} />
            ))}
        </ul>
      </div>
      </div>
      );
}
