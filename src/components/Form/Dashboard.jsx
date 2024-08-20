import { useEffect, useState } from "react";
import { Button, Card, Modal, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import babyTrackerImage from '../../assets/images/baby-tracker-KnS9ZnlS.png';
import ActivityChart from "../Charts/ActivityChart";
import MealChart from "../Charts/MealChart";
import ChartContainer from "../Container/ChartContainer";
import Biberones from "../Tables/Biberones";
import Diapers from "../Tables/Diapers";
import EventsForBeforeTodayList from "../Tables/EventsForBeforeTodayList";
import EventsForTodayList from "../Tables/EventsForTodayList";
import EventForm from "./EventForm";

const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [shouldRefresh, setShouldRefresh] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Función que se llama cuando se agrega un evento
  const handleEventAdded = () => {
    setShouldRefresh((prev) => !prev); // Cambia el estado para forzar la actualización
  };

  // Función que se llama cuando se elimina un evento
  const handleEventChange = () => {
    setShouldRefresh((prev) => !prev); // Cambia el estado para forzar la actualización
  };

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          {!userInfo ? (
            <Card className="text-center border-none">
              <Card.Body className="py-5 border-none">
                <Card.Title>Bienvenido a</Card.Title>
                <Card.Text>
                  <span className="text-secondary text-uppercase">
                    Baby Tracker
                  </span>
                </Card.Text>
              </Card.Body>
              <div className="text-center pb-3 border-none bg-white rounded-bottom d-flex justify-content-center align-items-center">
                <Card.Img
                  className="img-fluid w-25 h-25 rounded-circle p-3 bg-white"
                  variant="bottom"
                  src={babyTrackerImage}
                  alt="baby-tracker"
                  roundedcircle="true"
                />
              </div>
            </Card>
          ) : (
            <div>
              <EventForm setModalMessage={setModalMessage} setShowModal={setShowModal} onEventAdded={handleEventAdded}
              />
              <EventsForTodayList shouldRefresh={shouldRefresh} onEventDeleted={handleEventChange}/>
              <EventsForBeforeTodayList shouldRefresh={shouldRefresh} onEventDeleted={handleEventChange}
              />
              <Biberones shouldRefresh={shouldRefresh} />
              <Diapers shouldRefresh={shouldRefresh} />
              <ChartContainer>
                <ActivityChart shouldRefresh={shouldRefresh} />
                <MealChart shouldRefresh={shouldRefresh} />
              </ChartContainer>
            </div>
          )}
        </>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resultado</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Dashboard;
