import authReducer from "_pages/login/reducer";
import inputReducer from "_atoms/input/reducer";
import ticketReducer from "_pages/ticket/reducer";
import serviceReducer from "_pages/service/reducer";
import branchReducer from "_pages/branch/reducer";
import workingTimeReducer from "_pages/working-time/reducer";

export default {
  auth: authReducer,
  input: inputReducer,
  ticket: ticketReducer,
  service: serviceReducer,
  branch: branchReducer,
  workingTime: workingTimeReducer,
};
