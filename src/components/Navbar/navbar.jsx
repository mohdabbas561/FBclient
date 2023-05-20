import { Link } from 'react-router-dom';
import "./navbar.css";
function Navbar() {
  return (
      <div>
        <nav>
          <ul className="c">
            <li><Link to="/" className="li">Home</Link></li>
            <li><Link to="/About" className="li">About</Link></li>
            <li><Link to="/Help" className="li">Help</Link></li>
            <li><Link to="/Admin" className="GetStart">Admin</Link></li>
          </ul>
        </nav>
      </div>
  );
}
export default Navbar;