import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, groupEventsByCategory } from "../../slices/eventSlice";
import "./Chart.css";

const ActivityChart = ({ shouldRefresh }) => {
  const dispatch = useDispatch();
  const { categoryCounts } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEvents()).then(() => {
      dispatch(groupEventsByCategory());
    });
  }, [dispatch, shouldRefresh]);

  //console.log('Conteo de categorías:', categoryCounts);

  // Prepara los datos para el gráfico
  const data = [
    {
      name: "Eventos",
      data: Object.values(categoryCounts),
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
      categories: Object.keys(categoryCounts),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <div className="chart activity-chart">
      <h3 className="chart-title">Eventos por categoría</h3>
      <ReactApexChart options={options} series={data} type="bar" height={350} />
    </div>
  );
};

export default ActivityChart;
