import { query } from "_utils/httpRequest";
import { createAction } from "_utils/actionUtil";
import { GET_WORKING_TIME_GROUPS, ADD_WORKING_TIME_GROUP } from "./queries";

const actions = {
  GET_WORKING_TIME_GROUPS: createAction("GET_WORKING_TIME_GROUPS"),
  ADD_WORKING_TIME_GROUP: createAction("ADD_WORKING_TIME_GROUP"),
  getWorkingTimeGroups: (
    companyId,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      companyId: companyId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.GET_WORKING_TIME_GROUPS,
          GET_WORKING_TIME_GROUPS,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
  addWorkingTimeGroup: (
    data,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      companyId: data.companyId,
      name: data.name,
      workingTimes: data.workingTimes,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.ADD_WORKING_TIME_GROUP,
          ADD_WORKING_TIME_GROUP,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
};
export default actions;
