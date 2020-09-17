export const LOGIN_USER = `
mutation ($email: String!, $password: String!){
  loginUser(input: {
    email: $email
    password: $password
  }) {
    token
    user {
      id
      firstName
      lastName
      establishmentOwner {
        company {
          id
          name
          branches {
            id
            name
          }
        }
      }
      establishmentStaff {
        branch {
          id
          name
          company {
            id
            name
          }
        }
      }
    }
  }
}
`;

export const GET_USER_BY_CPF = `
query ($cpf: String!){
  getUserByCpf(cpf: $cpf) {
    id
    firstName
    lastName
    email
    phoneNumber
    cpf
  }
}
`;

export const REGISTER_USER = `
mutation ($email: String!, $password: String!, $firstName: String!, $lastName: String!, $cpf: String!, $phoneNumber: String!){
  registerUser(input: {
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    cpf: $cpf,
    phoneNumber: $phoneNumber
  }) {
    id
  }
}
`;
