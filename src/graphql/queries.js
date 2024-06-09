/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTransactions = /* GraphQL */ `
  query GetTransactions($id: ID!) {
    getTransactions(id: $id) {
      id
      sender_id
      receiver_id
      amount
      Students {
        nextToken
        __typename
      }
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
      transactionss {
        nextToken
        __typename
      }
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
export const getTransactionsStudent = /* GraphQL */ `
  query GetTransactionsStudent($id: ID!) {
    getTransactionsStudent(id: $id) {
      id
      transactionsId
      studentId
      transactions {
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
      student {
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
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listTransactionsStudents = /* GraphQL */ `
  query ListTransactionsStudents(
    $filter: ModelTransactionsStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactionsStudents(
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
export const transactionsStudentsByTransactionsId = /* GraphQL */ `
  query TransactionsStudentsByTransactionsId(
    $transactionsId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionsStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsStudentsByTransactionsId(
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
export const transactionsStudentsByStudentId = /* GraphQL */ `
  query TransactionsStudentsByStudentId(
    $studentId: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelTransactionsStudentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    transactionsStudentsByStudentId(
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
