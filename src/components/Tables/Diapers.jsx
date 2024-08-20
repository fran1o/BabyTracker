import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, filterEventsForDiapers, getLastEventByCategory } from "../../slices/eventSlice";

const Diapers = ({ shouldRefresh }) => {
  const dispatch = useDispatch();
  const { eventsForDiapers } = useSelector((state) => state.event);
  const [timeElapsed, setTimeElapsed] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents()).then(() => {
      dispatch(filterEventsForDiapers());
      dispatch(getLastEventByCategory(33)).then((result) => {
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
            Cantidad total de Pañales : {eventsForDiapers.length}
          </ListGroup.Item>
          <ListGroup.Item>
            Tiempo transcurrido desde el ultimo: {timeElapsed !== null ? `${timeElapsed} minutos` : "No disponible"}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

export default Diapers;
