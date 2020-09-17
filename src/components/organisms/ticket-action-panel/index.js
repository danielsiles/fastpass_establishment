import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ButtonBase from "@material-ui/core/ButtonBase";
import TicketCard from "_molecules/ticket-card";

import moment from "moment";

import { ticketStatusEnum } from "_utils/enumUtil";
import {
  Check,
  Replay,
  NotInterested,
  Cancel,
  ThumbUp,
  SwapHoriz,
} from "@material-ui/icons";

import "./style.css";

const TicketActionPanel = ({ ticket, waitingTime, onClick }) => {
  if (!ticket) {
    return (
      <TicketCard
        ticket={{
          status: "Nenhum ticket selecionado",
          service: {},
        }}
      />
    );
  }

  let actions = [
    { name: "Confirmar", icon: <Check />, action: "confirm" },
    { name: "Rechamar", icon: <Replay />, action: "recall" },
    { name: "Ausentar", icon: <NotInterested />, action: "absent" },
    { name: "Cancelar", icon: <Cancel />, action: "cancel" },
    { name: "Finalizar", icon: <ThumbUp />, action: "finalize" },
    { name: "Transferir", icon: <SwapHoriz />, action: "transfer" },
  ];

  if (ticket.status === "arrived") {
    actions = actions.filter(
      (action) =>
        action.action === "cancel" ||
        action.action === "finalize" ||
        action.action === "transfer"
    );
  }

  return (
    <Card className="cardContainer">
      {actions.map((item) => (
        <ButtonBase
          onClick={() => {
            onClick(item.action);
          }}
          key={item.name}
          className="actionButton"
        >
          {item.icon}
          <div>{item.name}</div>
        </ButtonBase>
      ))}
      <CardContent className="ticketContainer">
        <div className="ticketNumber">{ticket.ticketNumber}</div>
        <div className="ticketStatus">{ticketStatusEnum(ticket.status)}</div>
        <div className="ticketService">{ticket.service.name}</div>
        <div className="ticketWaitingTime">
          {moment(waitingTime).format("mm:ss")}
        </div>
      </CardContent>
    </Card>
  );
};

export default TicketActionPanel;
