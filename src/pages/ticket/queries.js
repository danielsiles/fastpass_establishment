export const GET_BRANCH = `
{
  me{
    establishmentStaff{
      branch{
        id
        name
        services {
          id
          name
        }
        desks{
          id
          name
        }
      }
    }
  }
}
`;

export const LIST_NON_FINISHED_TICKETS = `
query ($deskId: String!){
  nonFinishedTickets(deskId: $deskId) {
    id
    insertedAt
    ticketNumber
    status
    insertedAt
    service{ 
    name
    }
  }
}
`;

export const CALL_NEXT_IN_LINE = `
mutation ($deskId: String!){
  callNextTicket(deskId: $deskId) {
    id
    ticketNumber
  }
}
`;

export const CALL_NEXT_IN_LINE_BY_SERVICE = `
mutation ($deskId: String!, $serviceId: String!){
  callNextTicketByService(deskId: $deskId, serviceId: $serviceId) {
    id
    ticketNumber
  }
}
`;

export const GET_WAITING_TICKETS = `
query ($branchId: String!){
  waitingTickets(branchId: $branchId) {
    id
    ticketNumber
    service {
      id
      name
    }
  }
}
`;

export const CONFIRM_TICKET = `
mutation ($ticketId: String!){
  confirmTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const RECALL_TICKET = `
mutation ($ticketId: String!){
  recallTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const ABSENT_TICKET = `
mutation ($ticketId: String!){
  absentTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const CANCEL_TICKET = `
mutation ($ticketId: String!){
  cancelTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const FINALIZE_TICKET = `
mutation ($ticketId: String!){
  finalizeTicket(ticketId: $ticketId) {
    id
    status
  }
}
`;

export const TRANSFER_TICKET = `
mutation ($ticketId: String!, $serviceId: String!){
  transferTicket(ticketId: $ticketId, serviceId: $serviceId) {
    id
  }
}
`;

export const HOST_CREATE_TICKET = `
mutation ($serviceId: String!, $userId: String!, $priority: Boolean!){
  hostCreateTicket(input: {userId: $userId, serviceId: $serviceId, priority: $priority}) {
    id
  }
}
`;
