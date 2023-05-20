import bg from '../home/logobg.svg';
import { Link } from 'react-router-dom';
import "./home.css";
import Navbar from "../../components/Navbar/navbar";

function Home() {
  return (
    <>
    < Navbar />
    <div className="Home">

      <div className="image">
        <img className = "imgg" src={bg} alt = "text"/>
      </div>

      <h1 className = "h1">
        Welcome To FacePage
      </h1>
      <h3>
        Connect With Your Friends In just one Click...
    </h3>

      <Link to="/Register">
        <button className="SignUpBtn">
          Signup
     </button>
      </Link>
      <Link to="/Logins">
        <button className="LoginBtn">
          Login
   </button>
      </Link>
      <div className="footer">
        <h2>
          Made With Love By ECCians ❤️
      </h2>
      </div>

    </div>
    </>
  );
}

export default Home;
