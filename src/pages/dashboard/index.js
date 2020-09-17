import React from "react";
import Paper from "@material-ui/core/Paper";
import DefaultTemplate from "_components/templates/default";
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
  Legend,
  LineSeries,
} from "@devexpress/dx-react-chart-material-ui";
import moment from "moment";

import { Animation, Stack } from "@devexpress/dx-react-chart";

import "./style.css";

const data = [
  { year: "Aguardando", population: 40 },
  { year: "Ausente", population: 6 },
  { year: "Chamado", population: 76 },
  { year: "Cancelado", population: 7 },
  { year: "Re-chamado", population: 12 },
  { year: "Confirmado", population: 74 },
  { year: "Finalizado", population: 74 },
];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

let ticketServiceHour = [];
for (let i = 0; i < 24; i++) {
  ticketServiceHour.push({
    h: i,
    s1: getRandomArbitrary(20, 40),
    s2: getRandomArbitrary(20, 40),
    s3: getRandomArbitrary(20, 40),
  });
}

let ticketDay = [];
for (let i = 7; i > 0; i--) {
  ticketDay.push({
    d: moment().subtract(i, "days").format("DD/MM"),
    t: getRandomArbitrary(60, 140),
  });
}

const DashboardPage = () => {
  return (
    <DefaultTemplate pageName="Dashboard">
      <div className="dashboardContainer">
        <Paper style={{ margin: 10, width: 600, height: 300 }}>
          <Chart data={data} style={{ width: 600, maxHeight: 300 }}>
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries valueField="population" argumentField="year" />
            <Title text="Tickets Status x Dia" />
            <Animation />
            <Stack />
            {/* <Legend /> */}
          </Chart>
        </Paper>

        <Paper style={{ margin: 10, width: 600, height: 300 }}>
          <Chart
            data={ticketServiceHour}
            style={{ width: 600, maxHeight: 300 }}
          >
            <ArgumentAxis />
            <ValueAxis max={50} />

            <LineSeries
              name="Mesa para 2 pessoas"
              valueField="s1"
              argumentField="h"
            />
            <LineSeries
              name="Mesa para 4 pessoas"
              valueField="s2"
              argumentField="h"
            />
            <LineSeries
              name="Mesa para 6 pessoas"
              valueField="s3"
              argumentField="h"
            />
            {/* <Legend
              position="bottom"
              style={{ display: "flex", flexDirection: "row" }}
            /> */}
            <Title
              text={"#Tickets por serviço x hora"}
              // textComponent={TitleText}
            />
            <Animation />
          </Chart>
        </Paper>

        <Paper style={{ margin: 10, width: 600, height: 300 }}>
          <Chart data={ticketDay} style={{ width: 600, maxHeight: 300 }}>
            <ArgumentAxis />
            <ValueAxis max={50} />

            <LineSeries name="Num Tickets" valueField="t" argumentField="d" />

            {/* <Legend position="bottom" /> */}
            <Title text={"#Tickets por dia"} />
            <Animation />
          </Chart>
        </Paper>
      </div>
    </DefaultTemplate>
  );
};

export default DashboardPage;
