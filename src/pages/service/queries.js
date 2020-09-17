export const GET_SERVICES = `
query ($branchId: String!){
  branch (branchId: $branchId) {
    services {
      id
      name
      serviceLetter
      status
      workingTimeGroup {
        name
      }
    }
  }
}
`;

export const GET_WORKING_TIME_GROUPS = `
query ($companyId: String!){
  workingTimeGroup(companyId: $companyId) {
    id
    name
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
