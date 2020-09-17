export const createAction = (action) => {
  return {
    REQUEST: action + "_REQUEST",
    SUCCESS: action + "_SUCCESS",
    FAILURE: action + "_FAILURE",
    NAME: action.toLowerCase()
  };
};
