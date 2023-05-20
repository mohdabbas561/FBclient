import "./message.css";
import { format } from "timeago.js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Message({ message, own }) {
  const [user, setUser] = useState({});
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${currentUser.username}`);
      setUser(res.data);
      // console.log(res.data)
    };
    fetchUser();
  }, [currentUser.username]);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src=
          {user?.profilePicture
            ? PF + user?.profilePicture
            : PF + "person/noAvatar.png"}
          // "https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
