import React, { useState, useEffect } from "react";
import "../css/Navbar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import LibraryMusicIcon from "@material-ui/icons/LibraryMusic";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "../actions/authActions";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const dispatch = useDispatch();
  const histroy = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("/");
  const user = useSelector((state) => state.user);
  const { signOut } = useAuth();

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    let unlisten = histroy.listen((location, action) => {
      setCurrentLocation(location.pathname);
    });
    return unlisten;
  }, [histroy]);

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const logout = async () => {
    try {
      await signOut();
      dispatch(logoutUser());
    } catch (error) {
      alert(error.message);
    }
  };
  // const goToAdmin = () => {
  //   setAnchorEl(false);
  //   histroy.push("/admin");
  // };

  return (
    <div className="navbar">
      <img
        className="navbar__logo"
        src="https://raw.githubusercontent.com/mani-barathi/mani-barathi.github.io/master/assets/favicon.ico"
        alt=""
      />

      <div className="navbar__center">
        <Link
          to="/"
          className={
            currentLocation === "/"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkSpan">Home</span>
          <span className="navbar__linkIcon">
            <HomeIcon />
          </span>
        </Link>
        <Link
          to="/library"
          className={
            currentLocation === "/library"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkSpan">Library</span>
          <span className="navbar__linkIcon">
            <LibraryMusicIcon />
          </span>
        </Link>
        <Link
          to="/search"
          className={
            currentLocation === "/search"
              ? `navbar__link navbar__link--active`
              : "navbar__link"
          }
        >
          <span className="navbar__linkIcon">
            <SearchIcon />
          </span>
          <span className="navbar__linkSpan">Search</span>
        </Link>
      </div>

      <div className="navbar__right">
        <IconButton
          className="song__optionIcon"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={openOptions}
        >
          <Avatar src={user.photoURL} className="navbar__avatar">
            {" "}
          </Avatar>
        </IconButton>
        <Menu
          elevation={0}
          getContentAnchorEl={null}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(false)}
        >
          {/* <MenuItem onClick={goToAdmin}>
            <SupervisorAccountIcon fontSize="small" />
            <span className="navbar__rightMenuItem">Admin</span>
          </MenuItem> */}

          <MenuItem onClick={logout}>
            <ExitToAppIcon fontSize="small" />
            <span className="navbar__rightMenuItem">Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Navbar;
