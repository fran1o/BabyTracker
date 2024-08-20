import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, filterEventsForBiberones, getLastEventByCategory } from "../../slices/eventSlice";

const Biberones = ({ shouldRefresh }) => {
  const dispatch = useDispatch();
  const { eventsForBiberones } = useSelector((state) => state.event);
  const [timeElapsed, setTimeElapsed] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents()).then(() => {
      dispatch(filterEventsForBiberones());
      dispatch(getLastEventByCategory(35)).then((result) => {
        if (result.payload) {
          setTimeElapsed(result.payload.timeElapsed);
        }
      });
    });
  }, [dispatch, shouldRefresh]);

  return (
    <div className="table table-events">
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="table-title">
            Cantidad total de biberones : {eventsForBiberones.length}
          </ListGroup.Item>
          <ListGroup.Item>
            Tiempo transcurrido desde el ultimo: {timeElapsed !== null ? `${timeElapsed} minutos` : "No disponible"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Biberones;