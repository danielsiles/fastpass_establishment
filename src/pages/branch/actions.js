import { query } from "_utils/httpRequest";
import { createAction } from "_utils/actionUtil";
import { GET_BRANCH } from "./queries";

const actions = {
  SELECT_BRANCH: "SELECT_BRANCH",
  GET_BRANCH_DETAILS: createAction("GET_BRANCH_DETAILS"),
  selectBranch: (id) => {
    return {
      type: actions.SELECT_BRANCH,
      payload: id
    }
  },
  getBranch: (branchId, callbackSucceded = () => {}, callbackFailed = () => {}) => {
    let variables = {
      branchId: branchId
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_BRANCH_DETAILS,
          GET_BRANCH,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
};
export default actions;
