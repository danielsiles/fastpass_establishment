import { query } from "_utils/httpRequest";
import {
  GET_BRANCH,
  LIST_NON_FINISHED_TICKETS,
  CALL_NEXT_IN_LINE,
  CALL_NEXT_IN_LINE_BY_SERVICE,
  GET_WAITING_TICKETS,
  CONFIRM_TICKET,
  RECALL_TICKET,
  ABSENT_TICKET,
  CANCEL_TICKET,
  FINALIZE_TICKET,
  TRANSFER_TICKET,
  HOST_CREATE_TICKET,
} from "./queries";
import { createAction } from "_utils/actionUtil";

const actions = {
  GET_BRANCH: createAction("GET_BRANCH"),
  LIST_NON_FINISHED_TICKETS: createAction("LIST_NON_FINISHED_TICKETS"),
  CALL_NEXT_IN_LINE: createAction("CALL_NEXT_IN_LINE"),
  CALL_NEXT_IN_LINE_BY_SERVICE: createAction("CALL_NEXT_IN_LINE_BY_SERVICE"),
  GET_WAITING_TICKETS: createAction("GET_WAITING_TICKETS"),
  CHANGE_TICKET_STATUS: createAction("CHANGE_TICKET_STATUS"),
  TRANSFER_TICKET: createAction("TRANSFER_TICKET"),
  HOST_CREATE_TICKET: createAction("HOST_CREATE_TICKET"),
  SELECT_TICKET: "SELECT_TICKET",
  getBranch: (callbackSucceded = () => {}, callbackFailed = () => {}) => {
    let variables = {};
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_BRANCH,
          GET_BRANCH,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  listNonFinishedTickets: (
    deskId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      deskId: deskId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.LIST_NON_FINISHED_TICKETS,
          LIST_NON_FINISHED_TICKETS,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  callNextInLine: (
    deskId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      deskId: deskId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CALL_NEXT_IN_LINE,
          CALL_NEXT_IN_LINE,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  callNextInLineByService: (
    deskId,
    serviceId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      deskId: deskId,
      serviceId: serviceId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CALL_NEXT_IN_LINE_BY_SERVICE,
          CALL_NEXT_IN_LINE_BY_SERVICE,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  getPendingTickets: (
    branchId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      branchId: branchId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_WAITING_TICKETS,
          GET_WAITING_TICKETS,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  changeTicketStatus: (
    ticketId,
    action,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      ticketId: ticketId,
    };
    let queryString;
    switch (action) {
      case "confirm":
        queryString = CONFIRM_TICKET;
        break;
      case "recall":
        queryString = RECALL_TICKET;
        break;
      case "absent":
        queryString = ABSENT_TICKET;
        break;
      case "cancel":
        queryString = CANCEL_TICKET;
        break;
      case "finalize":
        queryString = FINALIZE_TICKET;
        break;
    }

    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.CHANGE_TICKET_STATUS,
          queryString,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  selectTicket: (ticketId) => {
    return {
      type: actions.SELECT_TICKET,
      payload: ticketId,
    };
  },
  transferTicket: (
    ticketId,
    serviceId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      ticketId: ticketId,
      serviceId: serviceId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.TRANSFER_TICKET,
          TRANSFER_TICKET,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  hostCreateTicket: (
    userId,
    serviceId,
    priority,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      userId,
      serviceId,
      priority,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.HOST_CREATE_TICKET,
          HOST_CREATE_TICKET,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
};
export default actions;
