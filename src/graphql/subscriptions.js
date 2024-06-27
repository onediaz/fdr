/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateStudentTable = /* GraphQL */ `
  subscription OnCreateStudentTable(
    $filter: ModelSubscriptionStudentTableFilterInput
  ) {
    onCreateStudentTable(filter: $filter) {
      id
      name
      students
      classroom
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateStudentTable = /* GraphQL */ `
  subscription OnUpdateStudentTable(
    $filter: ModelSubscriptionStudentTableFilterInput
  ) {
    onUpdateStudentTable(filter: $filter) {
      id
      name
      students
      classroom
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteStudentTable = /* GraphQL */ `
  subscription OnDeleteStudentTable(
    $filter: ModelSubscriptionStudentTableFilterInput
  ) {
    onDeleteStudentTable(filter: $filter) {
      id
      name
      students
      classroom
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onCreateTransactions = /* GraphQL */ `
  subscription OnCreateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onCreateTransactions(filter: $filter) {
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
export const onUpdateTransactions = /* GraphQL */ `
  subscription OnUpdateTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onUpdateTransactions(filter: $filter) {
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
export const onDeleteTransactions = /* GraphQL */ `
  subscription OnDeleteTransactions(
    $filter: ModelSubscriptionTransactionsFilterInput
  ) {
    onDeleteTransactions(filter: $filter) {
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
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
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
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
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
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
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
