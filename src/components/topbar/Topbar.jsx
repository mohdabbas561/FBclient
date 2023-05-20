import "./topbar.css";
import {
  Search,
  Chat,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { logoutCall } from "../../apiCalls";
import PriorityHighRoundedIcon from '@material-ui/icons/PriorityHighRounded';
import axios from "axios";
import ChatIcon from '@material-ui/icons/Chat';
import CloseIcon from "@material-ui/icons/Close";

export default function Topbar() {
  const { user: currentUser } = useContext(AuthContext);
  const [user, setUser] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const searchWord = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser.username]);

  useEffect(() => {
    const fetchAllUser = async () => {
      const res23 = await axios.get("/users/All");
      // setUser(res23);
      setData(res23.data);
    };
    fetchAllUser();
  }, []);

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleClick = async () => {
    logoutCall();
    try {
      window.location.reload(true);
      localStorage.clear();
    } catch (err) {
      console.log(err);
    }
  };
  const handelFiltered = async (e) => {

    const searchword = e.target.value;
    setWordEntered(searchword);
    const newFilter = data.filter((d) => {
      return d.username.toLowerCase().includes(searchword.toLowerCase());
    })
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  }
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(singleUser)
  // console.log(users)
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FacePage</span>
        </Link>
      </div>
      {/* <h2>Current User: {singleUser}</h2> */}
      <div className="topbarCenter">
        <div className="searchbar">
          {/* <Search className="searchInput" /> */}
          {filteredData.length === 0 ? (
            <Search />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
          <input placeholder="Search for friends"
            className="searchInput"
            enterButton="Search"
            onChange={handelFiltered}
          />
          {
            filteredData.length != 0 && (
              <div className="dataResult">
                {filteredData.slice(0, 10).map((d, key) => {
                  return (
                    <Link to={`/profile/${d.username}`}>
                      <img
                        className="sidebarFriendImg"
                        src={
                          d.profilePicture
                            ? PF + d.profilePicture
                            : PF + "person/noAvatar.png"
                        }
                        alt="" /> <span>{d.username}</span>
                      <a
                        className="dataItem"
                      >
                        {d.user}
                      </a>
                    </Link>
                  );
                })}

              </div>
            )
          }
        </div>
      </div>


      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span> */}
          {/* <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          {/* <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">
              <PriorityHighRoundedIcon className="topbarIconBadgeItem" />
            </span>
          </div> */}
         <div className="topbarIconItem">
            <Link to="/Messenger" style={{ textDecoration: "none" }}>
              <ChatIcon className="Chat" />
            </Link>
          
          </div>
          {/* <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">
              <PriorityHighRoundedIcon />
            </span>
          </div> */}
        </div>
        <Link to={`/profile/${user?.username}`}>
          <img
            src={
              user?.profilePicture
                ? PF + user?.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
        <div className="logoutButtonIcon">
          <button className="logoutButton" onClick={handleClick}>
            <PowerSettingsNewIcon />
          </button>
        </div>
      </div>
    </div >
  );
}
