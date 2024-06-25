/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateClassrooms = /* GraphQL */ `
  subscription OnCreateClassrooms(
    $filter: ModelSubscriptionClassroomsFilterInput
  ) {
    onCreateClassrooms(filter: $filter) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateClassrooms = /* GraphQL */ `
  subscription OnUpdateClassrooms(
    $filter: ModelSubscriptionClassroomsFilterInput
  ) {
    onUpdateClassrooms(filter: $filter) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteClassrooms = /* GraphQL */ `
  subscription OnDeleteClassrooms(
    $filter: ModelSubscriptionClassroomsFilterInput
  ) {
    onDeleteClassrooms(filter: $filter) {
      id
      name
      tables
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
