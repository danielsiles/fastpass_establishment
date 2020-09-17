import { GraphQLClient } from "graphql-request";
import * as withAbsintheSocket from "@absinthe/socket";
import { absintheSocket } from "../socket";

export function query(
  dispatch,
  getState,
  type,
  queryString,
  variables,
  callbackSucceeded = () => {},
  callbackFailed = () => {}
) {
  const client = new GraphQLClient("http://localhost:4000/api/graphql", {
    headers: {
      authorization: "Bearer " + getState().auth?.login?.token,
    },
  });

  return {
    type: type.REQUEST,
    payload: client
      .request(queryString, variables)
      .then((response) => {
        dispatch({ type: type.SUCCESS, payload: response });
        callbackSucceeded(response);
      })
      .catch((error) => {
        dispatch({ type: type.FAILURE, payload: error.response });
        callbackFailed(error.response);
      }),
  };
}

export function subscribe(
  dispatch,
  getState,
  type,
  queryString,
  variables,
  callbackSucceeded = () => {},
  callbackFailed = () => {}
) {
  let operation = queryString;
  const notifier = withAbsintheSocket.send(absintheSocket, {
    operation,
    variables: variables,
  });

  const dispatchEvent = (eventName) => (...args) => {
    dispatch({
      type: type + "_" + eventName,
      payload: args[0],
    });
  };

  let updatedNotifier = withAbsintheSocket.observe(absintheSocket, notifier, {
    onAbort: dispatchEvent("ABORT"),
    onError: dispatchEvent("ERROR"),
    onStart: dispatchEvent("OPEN"),
    onResult: dispatchEvent("RESULT"),
  });

  callbackSucceeded(updatedNotifier);
  return {
    type: type + "_SUBSCRIBE",
    payload: updatedNotifier,
  };
}

export function unsubscribe(dispatch, getState, notifier) {
  let updatedNotifier = notifier;
  let index = -1;
  for (let i = 0; i < absintheSocket.notifiers.length; i++) {
    if (absintheSocket.notifiers[i].request === notifier.request) {
      index = i;
      break;
    }
  }
  if (index < 0) {
    index = 0;
  }
  withAbsintheSocket.cancel(absintheSocket, absintheSocket.notifiers[index]);
  return {
    type: "_UNSUBSCRIBE",
    payload: updatedNotifier,
  };
}
