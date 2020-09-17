import { createReducer } from "@reduxjs/toolkit";
import { reduceAction, initState } from "_utils/reducerUtil";
import actions from "./actions";

const initialState = {
  [actions.GET_SERVICES.NAME]: initState(actions.GET_SERVICES.NAME, []),
  // [actions.GET_WORKING_TIME_GROUPS.NAME]: initState(
  //   actions.GET_WORKING_TIME_GROUPS.NAME,
  //   []
  // ),
};

const serviceReducer = createReducer(initialState, {
  ...reduceAction(actions.GET_SERVICES),
  [actions.GET_SERVICES.SUCCESS]: (state, action) => {
    state[actions.GET_SERVICES.NAME].data = action.payload.branch.services;
    state[actions.GET_SERVICES.NAME].loading = false;
    state[actions.GET_SERVICES.NAME].error = false;
  },
  // ...reduceAction(actions.GET_WORKING_TIME_GROUPS),
  // [actions.GET_WORKING_TIME_GROUPS.SUCCESS]: (state, action) => {
  //   state[actions.GET_WORKING_TIME_GROUPS.NAME].data =
  //     action.payload.workingTimeGroup;
  //   state[actions.GET_WORKING_TIME_GROUPS.NAME].loading = false;
  //   state[actions.GET_WORKING_TIME_GROUPS.NAME].error = false;
  // },
});

export default serviceReducer;
