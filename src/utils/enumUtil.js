export const ticketStatusEnum = (status) => {
  switch (status) {
    case "called":
      return "Chamado";
    case "recalled":
      return "Re-chamado";
    case "noShow":
      return "Ausente";
    case "arrived":
      return "Confirmado";
    case "canceled":
      return "Cancelado";
    case "done":
      return "Finalizado";
    default:
      return status;
  }
};
