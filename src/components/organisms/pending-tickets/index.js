import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import "./style.css";

const PendingTickets = ({ tickets }) => {
  let services = {};
  if (tickets && tickets.length > 0) {
    tickets.map((ticket) => {
      if (!services[ticket.service.name]) {
        services[ticket.service.name] = 1;
      } else {
        services[ticket.service.name]++;
      }
    });
  }
  return (
    <Card className="pendingTicketCardContainer">
      <CardContent className="pendingTicketContainer">
        {Object.keys(services).map((serviceName) => (
          <div key={serviceName} className="serviceWrapper">
            <div className="serviceName">{serviceName}</div>
            <div className="ticketCount">{services[serviceName]} tickets</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PendingTickets;
