/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      id
      sender
      amount
      receiver
      students {
        nextToken
        __typename
      }
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
        sender
        amount
        receiver
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
      Transactions {
        nextToken
        __typename
      }
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
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getStudentTransactions = /* GraphQL */ `
  query GetStudentTransactions($id: ID!) {
    getStudentTransactions(id: $id) {
      id
      transactionsId
      studentId
      transactions {
        id
        sender
        amount
        receiver
        createdAt
        updatedAt
        __typename
      }
      student {
        id
        email
        name
        balance
        isAdmin
        createdAt
        updatedAt
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listStudentTransactions = /* GraphQL */ `
  query ListStudentTransactions(
    $filter: ModelStudentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listStudentTransactions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        transactionsId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentTransactionsByTransactionsId = /* GraphQL */ `
  query StudentTransactionsByTransactionsId(
    $transactionsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentTransactionsByTransactionsId(
      transactionsId: $transactionsId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        transactionsId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const studentTransactionsByStudentId = /* GraphQL */ `
  query StudentTransactionsByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelStudentTransactionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    studentTransactionsByStudentId(
      studentId: $studentId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        transactionsId
        studentId
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
