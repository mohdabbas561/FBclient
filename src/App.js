import Home from "./pages/home/Home";
import Logins from "./pages/login/Logins";
import EditDetails from "./components/editDetails/EditDetails";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import About from './components/About/About';
import Help from './components/help/Help';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Webpage from "./pages/webpage/Webpage";
import Messenger from "./pages/messenger/Messenger";


import "./App.css"


function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route
          path="/Admin"
          component={() => {
            global.window && (global.window.location.href = 'http://localhost:4000/login');
            return null;
          }}
        />
        <Route exact path="/">
          {user ? <Webpage /> : < Home />}
        </Route>
        <Route exact path="/About">
          <About />
        </Route>
        <Route exact path="/Help">
          <Help />
        </Route>
        <Route path="/EditDetails/:username">
          {!user ? <Redirect to="/" /> : <EditDetails />}
        </Route>
        <Route path="/EditDetails">
          {!user ? <Redirect to="/" /> : <EditDetails />}
        </Route>
        <Route path="/logins">
          {user ? <Redirect to="/" /> : <Logins />}
        </Route>
        <Route path="/Register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/Messenger">
          {!user ? <Redirect to="/" /> : <Messenger />}
        </Route>
        <Route path="/profile/:username">
          {!user ? <Redirect to="/" /> : <Profile />}
        </Route>
      </Switch>
      {/* {!user ? <Redirect to="/" /> : <TopbarAdmin />}
      <div className="container">
        {!user ? <Redirect to="/" /> : <SidebarAdmin />}
        <Switch>
          <Route exact path="/homeAdmin">
            {!user ? <Redirect to="/" /> : <HomeAdmin />}
          </Route>
          <Route path="/usersAdmin">
            {!user ? <Redirect to="/" /> : <UserListAdmin />}
          </Route>
          <Route path="/userAdmin/:userId">
            {!user ? <Redirect to="/" /> : <UserAdmin />}
          </Route>
          <Route path="/newUser">
            {!user ? <Redirect to="/" /> : <NewUser />}
          </Route>
          <Route path="/products">
            {!user ? <Redirect to="/" /> : <ProductList />}
          </Route>
          <Route path="/product/:productId">
            {!user ? <Redirect to="/" /> : <Product />}
          </Route>
          <Route path="/newproduct">
            {!user ? <Redirect to="/" /> : <NewProduct />}
          </Route>
        </Switch>
      </div> */}
    </Router>
  );
}

export default App;
