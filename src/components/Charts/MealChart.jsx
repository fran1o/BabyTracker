import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, getMealsCountByDay } from "../../slices/eventSlice";
import "./Chart.css";

const MealChart = ({ shouldRefresh }) => {
  const dispatch = useDispatch();
  const { mealsCountForDay } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents()).then(() => {
      dispatch(getMealsCountByDay());
    });
  }, [dispatch, shouldRefresh]);

  //console.log('Conteo de categorías:', categoryCounts);

  // Obtiene los días de la semana en que se registraron eventos de comida en la última semana
  const categories = Object.keys(mealsCountForDay).map((date) => 
    format(parseISO(date), "EEEE", { locale: es }) // Formatea el día de la semana en español
  );

  // Prepara los datos para el gráfico
  const data = [
    {
      name: "Eventos",
      data: Object.values(mealsCountForDay),
    },
  ];

  // Opciones
  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="chart activity-chart">
      <h3 className="chart-title">Eventos de comidas de la ultima semana</h3>
      <ReactApexChart options={options} series={data} type="bar" height={350} />
    </div>
  );
};

export default MealChart;
