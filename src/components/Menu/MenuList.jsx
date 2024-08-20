import React, { useCallback } from "react";
import { IoStorefrontOutline, IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./MenuList.css";

const MenuList = () => {
  const { user: userInfo } = useSelector((state) => state.user);
  const [user, setUser] = useLocalStorage("user", userInfo);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate("/");
    window.location.reload();
  }, [setUser, navigate]);

  return (
    <ul className="menu--list">
      <li className="menu--list-item active">
        <Link to="/">
          <IoStorefrontOutline />
          Home
        </Link>
      </li>
      {localStorage.getItem("user") && (
        <li className="menu--list-item">
          <Link to="/" onClick={handleLogout}>
            <IoLogOutOutline />
            Logout
          </Link>
        </li>
      )}
    </ul>
  );
};

export default MenuList;
