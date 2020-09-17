import { createReducer } from "@reduxjs/toolkit";
import { reduceAction, initState } from "_utils/reducerUtil";
import actions from "./actions";

const initialState = {
  [actions.GET_BRANCH.NAME]: initState(actions.GET_BRANCH.NAME),
  [actions.LIST_NON_FINISHED_TICKETS.NAME]: {
    loading: false,
    error: false,
    data: [],
    dataMap: {},
  },
  [actions.GET_WAITING_TICKETS.NAME]: initState(
    actions.GET_WAITING_TICKETS.NAME
  ),
  selectedTicket: "",
};

const ticketReducer = createReducer(initialState, {
  ...reduceAction(actions.GET_BRANCH),
  [actions.GET_BRANCH.SUCCESS]: (state, action) => {
    state[actions.GET_BRANCH.NAME].data =
      action.payload.me.establishmentStaff.branch;
    state[actions.GET_BRANCH.NAME].loading = false;
    state[actions.GET_BRANCH.NAME].error = false;
  },
  ...reduceAction(actions.LIST_NON_FINISHED_TICKETS),
  [actions.LIST_NON_FINISHED_TICKETS.SUCCESS]: (state, action) => {
    state[actions.LIST_NON_FINISHED_TICKETS.NAME].data =
      action.payload.nonFinishedTickets;
    state[
      actions.LIST_NON_FINISHED_TICKETS.NAME
    ].dataMap = action.payload.nonFinishedTickets.reduce(function (map, obj) {
      map[obj.id] = obj;
      return map;
    }, {});
    state[actions.LIST_NON_FINISHED_TICKETS.NAME].loading = false;
    state[actions.LIST_NON_FINISHED_TICKETS.NAME].error = false;
  },
  [actions.SELECT_TICKET]: (state, action) => {
    state.selectedTicket = action.payload;
  },
  ...reduceAction(actions.GET_WAITING_TICKETS),
  [actions.GET_WAITING_TICKETS.SUCCESS]: (state, action) => {
    state[actions.GET_WAITING_TICKETS.NAME].data =
      action.payload.waitingTickets;
    state[actions.GET_WAITING_TICKETS.NAME].loading = false;
    state[actions.GET_WAITING_TICKETS.NAME].error = false;
  },
});

export default ticketReducer;
