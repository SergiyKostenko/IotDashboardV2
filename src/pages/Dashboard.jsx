import React, { useEffect } from "react";
import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCard from "../components/status-card/StatusCard";
import Chart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../redux/actions/ThemeAction";
import Badge from "../components/badge/Badge";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};



const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  head: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderlatestOrdersHead = (item, index) => <th key={index}>{item}</th>;

const renderlatestOrdersBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.date}</td>
    <td>{item.price}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer).mode;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ThemeAction.getTheme());
  });

  const cardsflex = {
    display : 'flex',
    'flex-direction' : 'row',
    'justify-content': 'space-around'
  }

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">

        <div className="col-12">
          <div className="card full-height">
            {/* chart*/}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="400px%"
            />
          </div>
        </div>
     
        <div className="col-12 cards-flex"  style={{cardsflex}}>

            {statusCards.map((item, index) => (
              <div key={index}>
                {item.title}
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.subtitle}
                />
              </div>
            ))}
   
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
