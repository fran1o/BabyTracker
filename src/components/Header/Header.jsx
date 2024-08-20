import React, { useCallback, useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import {
  IoLogInOutline,
  IoLogOutOutline,
  IoNotifications,
  IoSearch,
} from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import EventBus from "../../common/EventBus";
import useLocalStorage from "../../hooks/useLocalStorage";
import { fetchEvents } from "../../slices/eventSlice";
import "./Header.css";

const Header = () => {
  const { user: userInfo } = useSelector((state) => state.user);
  const { events } = useSelector((state) => state.event);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useLocalStorage("user", userInfo);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showEvents, setShowEvents] = useState(false);

  const handleClick = () => {
    if (events.length > 0) {
      setShowEvents(!showEvents);
    }
  };

  const handleLogout = useCallback(() => {
    setUser(null);
    navigate("/login");
  }, [setUser, navigate]);

  useEffect(() => {
    if (user) {
      EventBus.on("logout", () => {
        handleLogout();
      });
    }
    return () => {
      EventBus.remove("logout");
    };
  }, [user, handleLogout]);

  useEffect(() => {
    if (!userInfo && user) {
      dispatch({ type: "user/login/fulfilled", payload: user });
    }
  }, [userInfo, user, dispatch]);

  useEffect(() => {
    if (userInfo) {
      // Despacha la acción para obtener eventos cuando el usuario haya iniciado sesión
      dispatch(fetchEvents());
    }
  }, [userInfo, user, dispatch]);

  useEffect(() => {
    if (events) {
      // Actualiza el conteo de notificaciones basado en el número de eventos
      setNotificationCount(events.length);
    }
  }, [events]);

  const NotificationCard = ({ event }) => {
    return (
      <Card className="notification-card">
        <Card.Body>
          <Card.Title>{event.detalle}</Card.Title>
          <Card.Text>{event.fecha}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  console.log(user)
  console.log('UserInfo:', userInfo); // Verifica el valor de userInfo

  return (
    <>
      <div className="header">

        <div className="search-box">

        </div>

        <div className="user-box">
          <div className="notification-wrapper" onClick={handleClick}>
            <IoNotifications className="user--icon" />
            {notificationCount > 0 && (
              <Badge pill bg="danger" className="notification-count">
                {notificationCount}
              </Badge>
            )}
          </div>
          {showEvents && (
            <div className="events">
              {events.map((event, index) => (
                <NotificationCard key={index} event={event} />
              ))}
            </div>
          )}
          {localStorage.getItem("user") ? (
            <p className="text-center pt-3">Bienvenido</p>
          ) : (
            <Link to='/login'>
              <p className="text-center pt-3">Iniciar sesion</p>
            </Link>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
