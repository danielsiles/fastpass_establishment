export const GET_BRANCH = `
query ($branchId: String!){
  branch(branchId: $branchId) {
    id
    name
    services {
      id
      name
    }
    desks{
      id
      name
    }
  }
}
`;