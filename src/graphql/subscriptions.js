/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onCreateTransactions(filter: $filter) {
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
      transactionss {
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
      transactionss {
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
      transactionss {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTransactionsStudent = /* GraphQL */ `
  subscription OnCreateTransactionsStudent(
    $filter: ModelSubscriptionTransactionsStudentFilterInput
  ) {
    onCreateTransactionsStudent(filter: $filter) {
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
export const onUpdateTransactionsStudent = /* GraphQL */ `
  subscription OnUpdateTransactionsStudent(
    $filter: ModelSubscriptionTransactionsStudentFilterInput
  ) {
    onUpdateTransactionsStudent(filter: $filter) {
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
export const onDeleteTransactionsStudent = /* GraphQL */ `
  subscription OnDeleteTransactionsStudent(
    $filter: ModelSubscriptionTransactionsStudentFilterInput
  ) {
    onDeleteTransactionsStudent(filter: $filter) {
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
