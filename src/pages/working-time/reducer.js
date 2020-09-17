import { createReducer } from "@reduxjs/toolkit";
import { reduceAction, initState } from "_utils/reducerUtil";
import actions from "./actions";

const initialState = {
  [actions.GET_WORKING_TIME_GROUPS.NAME]: initState(
    actions.GET_WORKING_TIME_GROUPS.NAME,
    []
  ),
};

const workingTimeReducer = createReducer(initialState, {
  ...reduceAction(actions.GET_WORKING_TIME_GROUPS),
  [actions.GET_WORKING_TIME_GROUPS.SUCCESS]: (state, action) => {
    state[actions.GET_WORKING_TIME_GROUPS.NAME].data =
      action.payload.workingTimeGroup;
    state[actions.GET_WORKING_TIME_GROUPS.NAME].loading = false;
    state[actions.GET_WORKING_TIME_GROUPS.NAME].error = false;
  },
});

export default workingTimeReducer;
