export const GET_WORKING_TIME_GROUPS = `
query ($companyId: String!){
  workingTimeGroup(companyId: $companyId) {
    id
    name
    workingTimes {
      openTime
      closeTime
      weekDay
    }
  }
}
`;

export const ADD_SERVICE = `
mutation ($branchId: String!, $name: String!, $serviceLetter: String!, $workingTimeGroupId: String!) {
  addService(input:{
    branchId: $branchId
    name: $name
    serviceLetter: $serviceLetter,
    workingTimeGroupId: $workingTimeGroupId
  }) {
    id
    name
    insertedAt
  }
}
`;

export const ADD_WORKING_TIME_GROUP = `
mutation ($companyId: String!, $name: String!, $workingTimes: [WorkingTimeInput!]!) {
  createWorkingTimeGroup(input:{
    companyId: $companyId
    name: $name
    workingTimes: $workingTimes
  }) {
    id
    insertedAt
    name
  }
}
`;
