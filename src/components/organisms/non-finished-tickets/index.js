import React from "react";

import TicketCard from "_molecules/ticket-card";

import "./style.css";

const NonFinishedTickets = ({ tickets, onClick, waitingTime, filter }) => {
  tickets = tickets.filter((ticket) => {
    return filter.includes(ticket.status);
  });
  return (
    <div className="cards">
      {tickets.length > 0 &&
        tickets.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            onClick={() => onClick(ticket)}
            waitingTime={waitingTime}
          />
        ))}
      {tickets.length == 0 && (
        <TicketCard
          ticket={{
            status: "Não existe nenhum ticket não finalizado neste guichê",
            service: {},
          }}
        />
      )}
    </div>
  );
};

export default NonFinishedTickets;
