import { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { CardComponent } from "../../../../libs/ui/src/component/Card";
import { classNames } from "primereact/utils";
import { Chart } from "primereact/chart";
import { CostumeChart } from "../../../../libs/ui/src/component/CostumeChart";
import { sendRequestAtom } from "./../atoms";
import { useAtom } from "jotai";
import { ROLE_CUSTOMER_EXPERIENCE } from "./../lib/api";


interface Ticket {
  open: number; 
  in_progress: number; 
  closed: number;
  totalTickets: number; 
  overdue: number
}

interface Assignment {
  id: number;
  ticketId: number;
  comment: string;
  assignerId: number;
  category:Category;
  creator:any,
  createdAt: string;
  ticket: any;
}

interface User {
  id: number;
  fullname: string;
  email: string;
}

interface Category {
  id: number | string;
  name: string;
  // add other fields if needed
}

type MonthlyStatus = {
  open: number;
  inProgress: number;
  closed: number;
};


export function Dashboard(): JSX.Element {
  const [tickets, setTickets] = useState<Ticket>({ open: 0, in_progress: 0, closed: 0, overdue: 0, totalTickets: 0 });
  const [graphData, setGraphData] = useState<Record<string, MonthlyStatus>>({});
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState([]);
  const [, sendRequest] = useAtom(sendRequestAtom);
  const [doughnutData, setDoughnutData] = useState({});
  const [doughnutOptions2, setDoughnutOptions] = useState({});
  const [doughnutOptions3, setDoughnutOptions3] = useState({});
  const [chartData, setChartData] = useState({});
  const [chartData2, setChartData2] = useState({
    datasets: [],
  });
  const [selected, setSelected] = useState<string>("month");
  const [expanded, setExpanded] = useState<boolean>(false);

  const product = [
    {
      name: "MINUZA",
      percentage: 85,
      count: 1453,
      color: "#055427",
      bgColor: "#CBDAD3",
    },
    {
      name: "IGANZE MUHINZI MWOROZI (CDAT)",
      percentage: 20,
      count: 1200,
      color: "#6F8B18",
      bgColor: "#dfe589",
    },
    {
      name: "ASCENT",
      percentage: 15,
      count: 1000,
      color: "#B7AF0F",
      bgColor: "#efdd67",
    },
    {
      name: "REALESTATE",
      percentage: 10,
      count: 1453,
      color: "#286623",
      bgColor: "#CBDAD3",
    },
    {
      name: "SLB",
      percentage: 5,
      count: 1453,
      color: "#4B791D",
      bgColor: "#CBDAD3",
    },
    {
      name: "CANA UHENDUKIWE",
      percentage: 30,
      count: 1800,
      color: "#929D13",
      bgColor: "#dfe863",
    },
    {
      name: "IREME INVEST",
      percentage: 25,
      count: 1600,
      color: "#DBC20A",
      bgColor: "#efe188",
    },
    {
      name: "KATAZA",
      percentage: 10,
      count: 800,
      color: "#FFD406",
      bgColor: "#FDE3A7",
    },
    {
      name: "TEKERA AHEZA",
      percentage: 10,
      count: 800,
      color: "#FFD406",
      bgColor: "#FDE3A7",
    },
    {
      name: "OTHERS",
      percentage: 55,
      count: 500,
      color: "#F6E260",
      bgColor: "#F1EC9F",
    },
  ];
  const visibleItems = expanded ? product : product.slice(0, 3);

  const [chartOptions2, setChartOptions2] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const data = [50, 50];
  const color = ["#8AC241", "#F5F5F5"];
  const additionalOptions = {
    plugins: {
      legend: {
        display: true, // Show legend
        position: "top",
        tooltip: {
          enabled: false, // Disable hover tooltips
        }, // Position of the legend
      },
    },
    hover: {
      mode: null, // Disables hover interactions
    },
  };

  const normalizeStatus = (statusStr: string | undefined): number | null => {
    if (!statusStr) return null;
    switch (statusStr) {
      case 'Pending':
        return 1;
      case 'Completed':
        return 2;
      case 'Assigned':
        return 3;
      default:
        return null;
    }
  };

  const fetchTickets = async (data?: any) => {
    const res = await sendRequest({
      reqType: "get",
      url: "tickets",
      data: data,
    });
    setTickets(res?.data?.statusCounts);
    setGraphData(res?.data?.monthlyStatusCounts);
  };

  const fetchAssignments = async (data?: any) => {
    const res = await sendRequest({
      reqType: "get",
      url: "ticket-assignments",
      data: { limit: 5 },
    });
    setAssignments(res?.data?.rows);
  };

  const getUsers = async (data?: any): Promise<void> => {
    const res = await sendRequest({
      reqType: "post",
      url: `access/get-all-users`,
      data: { page: 1, per_page: 10 ,roleId:Number(ROLE_CUSTOMER_EXPERIENCE), status: true},
    });
    setUsers(res.data?.data);
  };

  const getCategories = async (data?: any): Promise<void> => {
    const res = await sendRequest({
      reqType: "get",
      url: `ticket-categories`,
      data: {},
    });
    setCategories(res.data?.rows);
  };

  const checkUserById = (userId: any) => {
    if (!userId) {
      return "Not yet assigned";
    }
    // Search for the product by ID
    const user = users?.find((u: any) => u.id === userId);
    
    return user ? user.fullname ?? user.email : "Not yet assigned";
  };


  const formatDate = (date: any) => {
    if (!date) return "Invalid Date";
    const parsedDate = typeof date === "string" ? new Date(date) : date;

    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
  
    return new Intl.DateTimeFormat('en-GB', options).format(parsedDate);
  
  };

  const getTicketsGraph = (data?: any) => {
    // Example dataset structure
    const dataset = {
      datasets: [
        {
          data: [
            tickets?.open,
            tickets?.closed,
            tickets?.in_progress,
            tickets?.overdue,
          ], // Example values, can be dynamic

          backgroundColor: ["#f59e09","#548C1C", "#8EC100", "#f87171"],
          hoverBackgroundColor: ["#f59e09", "#8EC100", "#548C1C", "#035427"],
          borderWidth: 0,
        },
      ],
      labels: [], // Example labels
    };

    // You can adjust dataset dynamically if needed
    if (data) {
      dataset.datasets[0].data = data.values || dataset.datasets[0].data;
      dataset.labels = data.labels || dataset.labels;
    }

    return dataset;
  };


  function calculateOverduePercentage(customTickets: any): number {
    if (!customTickets) return 0;

    // Calculate and Return Percentage
    const percentage = (customTickets / tickets.totalTickets) * 100;
    return parseFloat(percentage.toFixed(2));
  }

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);

    const data: any = {
      datasets: [
        {
          data: [20, 80], // 20% green, 80% gray
          backgroundColor: [
            documentStyle.getPropertyValue("--green-900"),
            documentStyle.getPropertyValue("--gray-500"),
          ], // Apply the gradient
          borderWidth: 0,
        },
      ],
    };
    const options = {
      cutout: "70%",
      plugins: {
        tooltip: {
          enabled: false, // Disable hover tooltips
        },
      },
      hover: {
        mode: null, // Disables hover interactions
      },
    };
    setChartData2(data);
    setChartOptions2(options);
    fetchAssignments();
    getUsers();
    getCategories();
    handleSelect("Month");
  }, []);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      //labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [70, 100, 10, 10],
          backgroundColor: [
            documentStyle.getPropertyValue("--orange-400"),
            documentStyle.getPropertyValue("--green-800"),
            documentStyle.getPropertyValue("--red-500"),
            documentStyle.getPropertyValue("--yellow-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--orange-600"),
            documentStyle.getPropertyValue("--green-500"),
            documentStyle.getPropertyValue("--red-400"),
            documentStyle.getPropertyValue("--yellow-400"),
          ],
          borderWidth: 0,
        },
      ],
    };

    const options = {
      cutout: "70%",
      plugins: {
        tooltip: {
          enabled: false, // Disable hover tooltips
        },
      },
      hover: {
        mode: null, // Disables hover interactions
      },
    };

    const options2 = {
      cutout: "80%", // Keeps the inner portion hollow
      rotation: -90, // Starts at the top of the circle (-90 degrees)
      circumference: 180,
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        tooltip: {
          enabled: false, // Disable hover tooltips
        },
      },
      hover: {
        mode: null, // Disables hover interactions
      },
    };

    setDoughnutData(data);
    setDoughnutOptions(options);
    setDoughnutOptions3(options2);
  }, []);
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentMonth = new Date().toLocaleString("en-US", { month: "long" });

    // Set default month as the current month
    const defaultFilteredMonth = currentMonth;

    // Function to get ticket data for a specific month (defaults to current month)
    const getMonthData = (month: any) => ({
      open: graphData?.[month]?.open || 0,
      inProgress: graphData?.[month]?.inProgress || 0,
      closed: graphData?.[month]?.closed || 0,
    });

    const { open, inProgress, closed } = getMonthData(defaultFilteredMonth);

    const data = {
      labels: months,
      datasets: [
        {
          label: "Open Tickets",
          data: months.map((month) => getMonthData(month).open),
          fill: false,
          tension: 0,
          borderColor: "#f59e09",
        },
        {
          label: "In Progress Tickets",
          data: months.map((month) => getMonthData(month).inProgress),
          fill: false,
          tension: 0.4,
          borderColor: "#8EC100",
        },
        {
          label: "Closed Tickets",
          data: months.map((month) => getMonthData(month).closed),
          fill: false,
          tension: 0.4,
          borderColor: "#548C1C",
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: {
              size: 15, // Increase the font size of the legend label
            },
          },
        },
        tooltip: {
          enabled: false, // Disable hover tooltips
        },
      },
      hover: {
        mode: null, // Disables hover interactions
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };
    setChartData(data);
    setChartOptions(options);
  }, [tickets]);

  /// Table Data
  const statusBodyTemplate = (rowData: any) => {
    const statusMap: { [key: number]: string } = {
      1: "Open",
      2: "Closed",
      3: "In progress",
    };

    // Get the status as a string
    const status =
      typeof rowData.status === "number" || typeof rowData.ticketStatus === "string"
        ? statusMap[rowData.status] || statusMap[normalizeStatus(rowData.ticketStatus) as any]
        : rowData.status || rowData.ticketStatus;
    return (
      <div
        style={{
          width: "15rem",
          backgroundColor:
            status === "In progress"
              ? " #8EC100"
              : status === "Closed"
              ? "#548C1C"
              : status === "Open"
              ? " #f59e09"
              : "inherit",
          color: status === "In progress" ? "text-white" : " text-black-600", // Text color white for "In progress"
        }}
        className={`p-2 rounded flex justify-content-center border-round`}
      >
        {status}
      </div>
    );
  };

  const nodes = assignments?.slice(0, 5).map((assignment) => {
    
    return {
      id: assignment.ticketId,
      activity: assignment.comment ?? assignment?.category?.name,
      initiator:  assignment?.creator?.email ?? checkUserById(assignment.assignerId),
      date: formatDate(assignment.createdAt),
      project: assignment.ticket.category?.name ?? "Minuza",
      status: statusBodyTemplate(assignment?.ticket),
    };
  });
  const closureRateData = {
    datasets: [
      {
        data: [
          tickets?.closed,
          tickets?.open,
        ], // 70% closed, 30% open
        backgroundColor: ["#f59e09", "#8EC100"], // Customize colors
        hoverBackgroundColor: ["#f59e09", "#8EC100"],
      },
    ],
  };
  function calculateClosureRate(tickets: any) {
    const closedTickets = tickets?.closed;
    const openTickets = tickets?.open;

    if (
      closedTickets == null ||
      openTickets == null ||
      closedTickets + openTickets === 0
    ) {
      return 0; // If no tickets or data is missing, return 0% closure rate
    }

    // Calculate closure rate as a percentage
    const totalTickets = closedTickets + openTickets;
    const closureRate = ((closedTickets / totalTickets) * 100).toFixed(1); // Returns percentage with 1 decimal

    return closureRate;
  }

  const doughnutLabel = {
    id: "doughnutLabel",
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, chartArea } = chart;
      ctx.save();

      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      ctx.font = "bold 15px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(calculateClosureRate(tickets) + " %", centerX, centerY); // Adjust this to show dynamic percentage
      const completedY = centerY + 25; // 25 pixels below the percentage

      // Draw the "completed" text below the percentage
      ctx.font = "15px sans-serif";
      ctx.fillStyle = "grey"; // Same color for consistency
      ctx.fillText("Completed", centerX, completedY); // Draw "completed" text

      ctx.restore();
    },
  };

  const doughnutLabel1 = {
    id: "doughnutLabel",
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, chartArea } = chart;
      ctx.save();

      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const completedY = centerY - 25; // 25 pixels above the percentage
      //   ctx.font = "2rem sans-serif";
      ctx.fillStyle = "black"; // Same color for consistency
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Total Tickets", centerX, completedY);

      ctx.font = "bold 30px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tickets?.totalTickets, centerX, centerY); // Adjust this to show dynamic percentage

      ctx.restore();
    },
  };

  const doughnutOptions4 = {
    id: "doughnutLabel4",
    beforeDatasetsDraw(chart: any, args: any, pluginOptions: any) {
      const { ctx, chartArea } = chart;
      ctx.save();

      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const completedY = centerY - 25; // 25 pixels above the percentage

      ctx.font = "bold 5px sans-serif";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(tickets?.totalTickets, centerX, centerY); // Adjust this to show dynamic percentage

      ctx.restore();
    },
  };

  const handleSelect = (option: string) => {
    setSelected(option);
    const rangeMapping: Record<string, string> = {
      "All Time": "all",
      Month: "month",
      Week: "week",
      Day: "day",
    };

    const range = rangeMapping[option] || "month"; 
    const dashboard = "dashboard"; // Default to 'month'
    fetchTickets({
      serializedFilterValues: JSON.stringify({ range,dashboard }),
    });
  };

  return (
    <div className="flex w-full flex-column">
      <div className="flex w-full justify-content-center sm:justify-content-end px-6 gap-2">
        {["All Time", "Month", "Week", "Day"].map((option) => (
          <div
            key={option}
            onClick={() => handleSelect(option)}
            style={{
              borderRadius: "0.4rem",
              backgroundColor:
                selected === option ? "#8BC24224" : "transparent",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: "1rem",
            }}
            className="font-small px-2 h-1"
          >
            {option}
          </div>
        ))}
      </div>
      <div className="flex flex-row w-full ">
        <div className="flex flex-column w-full ">
          <div className=" flex-row md:flex w-full gap-4  justify-content-between">
            <div className="flex flex-column md:w-9 ">
              {/* Cards.......... */}

              <div className=" w-full flex-row gap-2 gap-3 sm:flex ">
                <CardComponent>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "normal",
                    }}
                  >
                    Customer interactions
                  </div>

                  <div className="flex flex-row justify-content-between mt-3">
                    <div className=" flex flex-column justify-content-center align-items-center">
                      <i
                        className={"pi pi-user"}
                        style={{ fontSize: "1.5rem", color: "#8AC241" }}
                      ></i>
                      1,324
                    </div>
                    <div className=" flex flex-column justify-content-center align-items-center">
                      <i
                        className={"pi pi-phone "}
                        style={{ fontSize: "1.5rem", color: "#8AC241" }}
                      ></i>
                      941
                    </div>
                    <div className=" flex flex-column justify-content-center align-items-center">
                      <i
                        className={"pi pi-envelope "}
                        style={{ fontSize: "1.5rem", color: "#8AC241" }}
                      ></i>
                      179
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1rem",
                      marginTop: "1rem",
                    }}
                  >
                    Total interactions:{" "}
                    <strong style={{ color: "black", marginLeft: "0.5rem" }}>
                      {" "}
                      2,447
                    </strong>
                  </div>
                </CardComponent>
                <CardComponent>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "normal",
                    }}
                  >
                    Overall Closure Rate
                  </div>

                  <div
                    style={{
                      height: "90px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Chart
                      type="doughnut"
                      data={closureRateData}
                      options={doughnutOptions3}
                      plugins={[doughnutLabel]}
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                </CardComponent>
                <CardComponent>
                  <div
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: "normal",
                    }}
                  >
                    Customer Satisfaction Rate
                  </div>

                  <div className="flex flex-column justify-content-between">
                    <div className="flex flex-column justify-content-center align-items-center w-full">
                      <text
                        style={{
                          fontFamily: "bold",
                        }}
                      >
                        4.9
                      </text>
                    </div>
                    <div className=" flex flex-row justify-content-center  gap-3  align-items-center w-full">
                      <i
                        className={"pi pi-star-fill"}
                        style={{ fontSize: "1rem", color: "#F1C644" }}
                      ></i>
                      <i
                        className={"pi pi-star-fill"}
                        style={{ fontSize: "1rem", color: "#F1C644" }}
                      ></i>
                      <i
                        className={"pi pi-star-fill"}
                        style={{ fontSize: "1rem", color: "#F1C644" }}
                      ></i>
                      <i
                        className={"pi pi-star-fill"}
                        style={{ fontSize: "1rem", color: "#F1C644" }}
                      ></i>
                      <i
                        className={"pi pi-star-fill"}
                        style={{ fontSize: "1rem", color: "#D4D4D4" }}
                      ></i>
                    </div>
                    <div className=" flex justify-content-center  align-items-center w-full">
                      <text
                        style={{
                          fontSize: "0.8rem",
                        }}
                      >
                        1,432 Ratings
                      </text>
                    </div>
                    <div className=" flex justify-content-center  mt-1  align-items-center w-full ">
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          style={{
                            width: "4rem",
                            // height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                          }}
                        >
                          <CostumeChart
                            data={data}
                            colors={color}
                            additionalOptions={additionalOptions}
                            response={index + 1}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardComponent>
              </div>
              <div className="h-4">
                <div className="bg-white p-4 border h-3  rounded-lg mt-4" style={{border: "1px solid green", borderRadius: "0.6rem"}}>
                  <h2 className="text-lg font-semibold">Customer Tickets</h2>
                  <Chart
                    type="line"
                    data={chartData}
                    options={chartOptions}
                    className="w-full  h-34"
                  />
                </div>
              </div>
            </div>

            {/* Down 3 Component ----------->: */}

            <div
              style={{
                borderRadius: "0.4rem",
                border: "1px solid green",
              }}
              className="md:w-3 w-full p-4 border sm:mt-0 mt-2 bg-white rounded-lg"
            >
              <div
                style={{
                  borderRadius: "0.4rem",
                }}
                className="flex flex-column bg-white px-4 py-1 justify-content-between"
              >
                <div className="flex flex-row justify-content-between align-items-center">
                  <h2 className="text-lg font-semibold mt-4">
                    Ticket Overview
                  </h2>
                  <i
                    className={"pi pi-info-circle text-gray-500"}
                    style={{ fontSize: "0.8rem" }}
                  ></i>
                </div>
                <div className="flex flex-row gap-8">
                  <div className="flex flex-column">
                    <text
                      style={{
                        color: "GrayText",
                        fontSize: "1rem",
                        fontWeight: "normal",
                      }}
                    >
                      Closed{" "}
                    </text>
                    <text
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {tickets?.closed}
                    </text>
                    <text
                      style={{
                        fontSize: "1rem",
                        color: "green",
                      }}
                    ></text>
                  </div>
                  <div className="flex flex-column">
                    <text
                      style={{
                        color: "GrayText",
                        fontSize: "1rem",
                        fontWeight: "normal",
                      }}
                    >
                      Open{" "}
                    </text>
                    <text
                      style={{
                        fontSize: "1rem",
                        fontWeight: "bold",
                      }}
                    >
                      {tickets?.open}{" "}
                    </text>
                    <text
                      style={{
                        fontSize: "1rem",
                        color: "red",
                      }}
                    ></text>
                  </div>
                </div>
                <Chart
                  type="doughnut"
                  className="mt-2"
                  style={{ height: "20rem" }}
                  data={getTicketsGraph()}
                  options={doughnutOptions2}
                  plugins={[doughnutLabel1]}
                />
                <div className="flex flex-column py-5 gap-4">
                  <div className=" flex-column">
                    {/** FIRST ROW */}
                    <div className="flex flex-row justify-content-between border border-bottom-1 p-1 border-gray-400">
                      <div className=" md:px-2  w-full">
                        <i
                          className={"pi pi-circle-fill"}
                          style={{ fontSize: "0.5rem", color: "#f59e09" }}
                        ></i>{" "}
                        <text
                          style={{
                            fontSize: "1rem",
                            color: "GrayText",
                          }}
                        >
                          Open
                        </text>
                      </div>
                      <div className="flex flex-row  w-full justify-content-between align-items-center">
                        <text
                          style={{
                            fontSize: "1rem",
                          }}
                        >
                          {tickets?.open}
                        </text>
                        <text
                          style={{
                            fontSize: "1rem",
                          }}
                        >
                          {calculateOverduePercentage(
                            tickets?.open,
                          )}
                          %
                        </text>
                      </div>
                    </div>
                  </div>
                  {/**  SECOND ROW */}

                  <div className="flex flex-row justify-content-between border border-bottom-1 p-1 border-gray-400">
                    <div className="md:px-2 w-full">
                      <i
                        className={"pi pi-circle-fill"}
                        style={{ fontSize: "0.5rem", color: "#8EC100" }}
                      ></i>{" "}
                      <text
                        style={{
                          fontSize: "1rem",
                          color: "GrayText",
                        }}
                      >
                        In progress
                      </text>
                    </div>
                    <div className="flex flex-row w-full justify-content-between align-items-center">
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {tickets?.in_progress}
                      </text>
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {calculateOverduePercentage(
                          tickets?.in_progress
                        )}
                        %
                      </text>
                    </div>
                  </div>
                  {/** THIRD ROW */}
                  <div className="flex flex-row justify-content-between border border-bottom-1 p-1 border-gray-400">
                    <div className="md:px-2 w-full">
                      <i
                        className={"pi pi-circle-fill"}
                        style={{ fontSize: "0.5rem", color: "#548C1C" }}
                      ></i>{" "}
                      <text
                        style={{
                          fontSize: "1rem",
                          color: "GrayText",
                        }}
                      >
                        Closed
                      </text>
                    </div>
                    <div className="flex flex-row  w-full justify-content-between align-items-center">
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {tickets?.closed}
                      </text>
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {calculateOverduePercentage(
                          tickets?.closed
                        )}
                        %
                      </text>
                    </div>
                  </div>
                  {/** FOURTH */}
                  <div className="flex flex-row justify-content-between border -1 p-1">
                    <div className="md:px-2 w-full">
                      <i
                        className={"pi pi-circle-fill"}
                        style={{ fontSize: "0.5rem", color: "#CE091C" }}
                      ></i>{" "}
                      <text
                        style={{
                          fontSize: "1rem",
                          color: "GrayText",
                        }}
                      >
                        Overdue
                      </text>
                    </div>
                    <div className="flex flex-row w-full justify-content-between align-items-center">
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {tickets?.overdue}
                      </text>
                      <text
                        style={{
                          fontSize: "1rem",
                        }}
                      >
                        {calculateOverduePercentage(tickets?.overdue)}%
                      </text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=" sm:flex flex-col w-full  py-2  justify-content-between">
            <div className="sm:flex flex-col sm:gap-4 sm:w-9  justify-content-between">
              <div
                style={{
                  height: "18rem",
                  // width: "30rem",
                  borderRadius: "0.6rem",
                  border: "1px solid green",
                }}
                className="flex sm:w-6 flex-column  bg-white py-2 px-4 "
              >
                <div
                  style={{
                    // color: "GrayText",
                    fontSize: "1.5rem",
                  }}
                >
                  Upcoming Marketing Campaigns
                </div>
                <div className="flex justify-content-between mt-2">
                  <div
                    style={{
                      color: "#60666C",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    Hatana Challenge Phase 2
                  </div>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#8BC24224",
                      color: "#8AC241",
                      fontSize: "0.6rem",
                      fontWeight: "bold",
                      padding: 4,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    19 June 2024, 11:00am
                  </div>
                </div>
                <div
                  style={{
                    color: "#949A9C",
                    fontSize: "0.7rem",
                    marginTop: "0.4rem",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  iaculis massa in arcu pulvinar varius. Etiam placerat tellus
                  non eros.
                </div>
                <div
                  style={{
                    width: "100%",
                    border: "1px solid #D9D9D9",
                    marginTop: "0.6rem",
                  }}
                ></div>
                {/**---------- Second Phase */}

                <div className="flex justify-content-between mt-2">
                  <div
                    style={{
                      color: "#60666C",
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                    }}
                  >
                    Hatana Challenge Phase 3
                  </div>
                  <div
                    style={{
                      display: "flex",
                      backgroundColor: "#8BC24224",
                      color: "#8AC241",
                      fontSize: "0.6rem",
                      fontWeight: "bold",
                      padding: 4,
                      borderRadius: 4,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    24 July 2024, 11:00am
                  </div>
                </div>
                <div
                  style={{
                    color: "#949A9C",
                    fontSize: "0.7rem",
                    marginTop: "0.4rem",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  iaculis massa in arcu pulvinar varius. Etiam placerat tellus
                  non eros.
                </div>
              </div>

              {/**Second Card */}

              <div
                style={{
                  height: "18rem",
                  borderRadius: "0.6rem",
                  border: "1px solid green",
                }}
                className="flex flex-column bg-white py-2 px-4 sm:w-6 mt-2 sm:mt-0 sm:mr-4 "
              >
                <div
                  style={{
                    fontSize: "1.5rem",
                  }}
                >
                  Conversation
                </div>

                {/**Lines -----> */}
                <div className="flex gap-2">
                  <div
                    style={{
                      width: "74%",
                      height: "17px",
                      backgroundColor: "#056333",
                      marginTop: "40px",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "25%",
                      height: "17px",
                      backgroundColor: "#8AC241",
                      marginTop: "40px",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
                {/** Labels */}
                <div className="flex mt-3">
                  <div
                    style={{
                      width: "10px",
                      height: "25px",
                      backgroundColor: "#056333",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div className="flex justify-content-between w-full">
                    <div style={{ marginLeft: "5px", fontSize: "14px" }}>
                      75.4%
                      <text
                        style={{
                          marginLeft: "10px",
                          fontSize: "10px",
                          color: "#348352",
                        }}
                      >
                        <i
                          className={"pi pi-arrow-up-right"}
                          style={{ fontSize: "0.4rem", color: "#348352" }}
                        ></i>{" "}
                        -1 (-12.5%)
                      </text>
                    </div>
                    <div style={{ fontSize: "14px", color: "#949A9C" }}>
                      1,952 Responded{" "}
                    </div>
                  </div>
                </div>
                <div className="flex mt-3">
                  <div
                    style={{
                      width: "10px",
                      height: "25px",
                      backgroundColor: "#8AC241",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div className="flex justify-content-between w-full">
                    <div style={{ marginLeft: "5px", fontSize: "14px" }}>
                      24.6%
                    </div>
                    <div style={{ fontSize: "14px", color: "#949A9C" }}>
                      483 Unread{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------- */}
            <div
              style={{
                borderRadius: "0.6rem",
                border: "1px solid green",
                // width: "30rem",
              }}
              className="flex sm:w-3 flex-column bg-white sm:mt-0 mt-2 py-2 px-3 "
            >
              <div
                style={{
                  // color: "GrayText",
                  fontSize: "1.5rem",
                }}
              >
                Customers Active
              </div>
              <div className="">
                {visibleItems.map((item, index) => (
                  <div key={index} className="p-1 flex flex-column ">
                    <div className="flex justify-content-between">
                      <span style={{ fontSize: "14px" }}>{item.name}</span>
                      <span style={{ fontSize: "14px", color: "#949A9C" }}>
                        {item.count} ({item.percentage}%)
                      </span>
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "15px",
                        backgroundColor: item.bgColor,
                        borderRadius: "15px",
                        marginTop: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percentage}%`,
                          height: "15px",
                          backgroundColor: item.color,
                          borderRadius: "15px",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}

                {/* Toggle Button */}
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "green",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    marginTop: '1rem'
                  }}

                >
                  {expanded ? "View Less" : "View More"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/**Table Side ........... */}

      <div className="flex  py-1">
        <div
          style={{
            borderRadius: "0.6rem",
            border: "1px solid green",
          }}
          className="flex flex-column bg-white w-full p-4"
        >
          <div
            style={{
              fontSize: "1.5rem",
            }}
          >
            Recent Activities
          </div>
          <div
            style={{
              width: "100%",
              border: "1px solid #D9D9D9",
              marginTop: "1rem",
            }}
          ></div>
          <div className="flex flex-column p-2 mb-3">
            <DataTable
              value={nodes}
              tableStyle={{ minWidth: "65rem" }}
              paginator
              rows={5}
              rowsPerPageOptions={[5]}
            >
              <Column
                className=""
                field="id"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    ID
                  </span>
                }
              ></Column>
              <Column
                field="activity"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Activity
                  </span>
                }
              ></Column>
              <Column
                field="initiator"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Initiator
                  </span>
                }
              ></Column>
              <Column
                field="status"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Status
                  </span>
                }
                body={statusBodyTemplate}
              ></Column>
              <Column
                field="date"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Date
                  </span>
                }
              ></Column>
              <Column
                field="project"
                header={
                  <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                    Project
                  </span>
                }
              ></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  );
}
