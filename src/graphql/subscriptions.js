/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onCreateTransactions(filter: $filter) {
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
export const onUpdateTransactions = /* GraphQL */ `
  subscription OnUpdateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onUpdateTransactions(filter: $filter) {
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
export const onDeleteTransactions = /* GraphQL */ `
  subscription OnDeleteTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onDeleteTransactions(filter: $filter) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
export const onCreateStudentTransactions = /* GraphQL */ `
  subscription OnCreateStudentTransactions(
    $filter: ModelSubscriptionStudentTransactionsFilterInput
  ) {
    onCreateStudentTransactions(filter: $filter) {
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
export const onUpdateStudentTransactions = /* GraphQL */ `
  subscription OnUpdateStudentTransactions(
    $filter: ModelSubscriptionStudentTransactionsFilterInput
  ) {
    onUpdateStudentTransactions(filter: $filter) {
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
export const onDeleteStudentTransactions = /* GraphQL */ `
  subscription OnDeleteStudentTransactions(
    $filter: ModelSubscriptionStudentTransactionsFilterInput
  ) {
    onDeleteStudentTransactions(filter: $filter) {
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
