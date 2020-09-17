import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActionArea from "@material-ui/core/CardActionArea";

import moment from "moment";

import { ticketStatusEnum } from "_utils/enumUtil";

import "./style.css";

const TicketCard = ({ ticket, waitingTime, onClick }) => (
  <Card className="card" key={ticket.id}>
    <CardActionArea onClick={onClick}>
      <CardContent className="">
        <div className="ticketNumber">{ticket.ticketNumber}</div>
        <div className="ticketStatus">{ticketStatusEnum(ticket.status)}</div>
        <div className="ticketService">{ticket.service.name}</div>
        {ticket.insertedAt && <div>Reservado às {moment(ticket.insertedAt).format("hh:mm")}</div>}
        {waitingTime && (
          <div className="ticketWaitingTime">
            {moment(waitingTime).format("mm:ss")}
          </div>
        )}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default TicketCard;
