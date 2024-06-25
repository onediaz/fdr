/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getClassrooms = /* GraphQL */ `
  query GetClassrooms($id: ID!) {
    getClassrooms(id: $id) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listClassrooms = /* GraphQL */ `
  query ListClassrooms(
    $filter: ModelClassroomsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listClassrooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        tables
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      id
      sender_id
      receiver_id
      amount
      sender_name
      receiver_name
      message
      likes
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sender_id
        receiver_id
        amount
        sender_name
        receiver_name
        message
        likes
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudent = /* GraphQL */ `
  query GetStudent($id: ID!) {
    getStudent(id: $id) {
      id
      email
      name
      balance
      isAdmin
      profile_picture
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStudents = /* GraphQL */ `
  query ListStudents(
    $filter: ModelStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        name
        balance
        isAdmin
        profile_picture
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
