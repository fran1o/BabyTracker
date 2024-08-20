import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../slices/categoriesSlice";
import {
  deleteEvent,
  fetchEvents,
  filterEventsByBeforeDate,
} from "../../slices/eventSlice";
import "./Table.css";

const EventsForBeforeTodayList = ({ shouldRefresh, onEventDeleted }) => {
  const dispatch = useDispatch();
  const { eventsForBeforeToday, error } = useSelector((state) => state.event);
  const { categories } = useSelector((state) => state.categories);

  const IMAGE_URL = "https://babytracker.develotion.com/imgs/";

  useEffect(() => {
    dispatch(fetchEvents()).then(() => {
      dispatch(filterEventsByBeforeDate());
    });
    dispatch(fetchCategories());
  }, [dispatch, shouldRefresh]);

  const handleDelete = (id) => {
    dispatch(deleteEvent(id)).then(() => {
      dispatch(filterEventsByBeforeDate());
      onEventDeleted();
    });
  };

  const getCategoryIconUrl = (idCategoria) => {
    const category = categories.find((cat) => cat.id === idCategoria);

    return category ? `${IMAGE_URL}${category.imagen}.png` : "";
  };

  return (
    <div className="table table-events">
      <h3 className="table-title">
        Eventos realizados antes de la fecha de hoy |{" "}
        {eventsForBeforeToday.length}
      </h3>
      {error && <p className="text-danger mt-3">{error}</p>}
      <Table className="table table-events">
        <thead>
          <tr>
            <th>ID</th>
            <th>Categoria</th>
            <th>Usuario</th>
            <th>Detalle</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {eventsForBeforeToday.map((evento) => (
            <tr key={evento.id}>
              <td>{evento.id}</td>
              <td>
                <img
                  src={getCategoryIconUrl(evento.idCategoria)}
                  className="rounded"
                  alt={`Icon for category ${evento.idCategoria}`}
                />
              </td>
              <td>{evento.idUsuario}</td>
              <td>{evento.detalle}</td>
              <td>{evento.fecha}</td>
              <td>
                <button onClick={() => handleDelete(evento.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EventsForBeforeTodayList;
