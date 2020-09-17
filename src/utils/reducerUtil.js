export const reduceAction = (action, dataStatusName) => {
  return {
    [action.REQUEST]: (state) => {
      state[action.NAME].loading = true;
      state[action.NAME].error = false;
    },
    [action.FAILURE]: (state) => {
      state[action.NAME].loading = false;
      state[action.NAME].error = true;
    },
  };
};

export const reduceSubscription = (action, notifierName) => {
  return {
    [action + "_SUBSCRIBE"]: (state, action) => {
      state[notifierName] = action.payload;
    },

    [action + "_UNSUBSCRIBE"]: (state, action) => {
      // state[notifierName] = action.payload
    },
  };
};

export const initState = (action, data = {}) => {
  return {
    loading: false,
    error: false,
    data: data,
  };
};
