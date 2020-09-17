import { createReducer } from "@reduxjs/toolkit";
import actions from "./actions";
import { reduceAction, initState } from "_utils/reducerUtil";

const initialState = {
  selectedBranch: "",
  [actions.GET_BRANCH_DETAILS.NAME]: initState(actions.GET_BRANCH_DETAILS.NAME),
};

const branchReducer = createReducer(initialState, {
  [actions.SELECT_BRANCH]: (state, action) => {
    state.selectedBranch = action.payload
  },
  ...reduceAction(actions.GET_BRANCH_DETAILS),
  [actions.GET_BRANCH_DETAILS.SUCCESS]: (state, action) => {
    state[actions.GET_BRANCH_DETAILS.NAME].data =
      action.payload.branch;
    state[actions.GET_BRANCH_DETAILS.NAME].loading = false;
    state[actions.GET_BRANCH_DETAILS.NAME].error = false;
  },
});

export default branchReducer;
