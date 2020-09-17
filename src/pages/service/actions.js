import { query } from "_utils/httpRequest";
import { createAction } from "_utils/actionUtil";
import { GET_SERVICES, GET_WORKING_TIME_GROUPS, ADD_SERVICE } from "./queries";

const actions = {
  GET_SERVICES: createAction("GET_SERVICES"),
  GET_WORKING_TIME_GROUPS: createAction("GET_WORKING_TIME_GROUPS"),
  ADD_SERVICE: createAction("ADD_SERVICE"),
  getServices: (
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
          actions.GET_SERVICES,
          GET_SERVICES,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
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
  addService: (
    data,
    callbackSucceded = () => {},
    callbackFailed = () => {}
  ) => {
    let variables = {
      branchId: data.branchId,
      name: data.name,
      serviceLetter: data.serviceLetter,
      workingTimeGroupId: data.workingTimeGroupId,
    };
    return (dispatch, getState) => {
      dispatch(
        query(
          dispatch,
          getState,
          actions.ADD_SERVICE,
          ADD_SERVICE,
          variables,
          callbackSucceded,
          callbackFailed
        )
      );
    };
  },
};
export default actions;
