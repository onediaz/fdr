/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createClassrooms = /* GraphQL */ `
  mutation CreateClassrooms(
    $input: CreateClassroomsInput!
    $condition: ModelClassroomsConditionInput
  ) {
    createClassrooms(input: $input, condition: $condition) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateClassrooms = /* GraphQL */ `
  mutation UpdateClassrooms(
    $input: UpdateClassroomsInput!
    $condition: ModelClassroomsConditionInput
  ) {
    updateClassrooms(input: $input, condition: $condition) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteClassrooms = /* GraphQL */ `
  mutation DeleteClassrooms(
    $input: DeleteClassroomsInput!
    $condition: ModelClassroomsConditionInput
  ) {
    deleteClassrooms(input: $input, condition: $condition) {
      id
      name
      tables
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createTransactions = /* GraphQL */ `
  mutation CreateTransactions(
    $input: CreateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    createTransactions(input: $input, condition: $condition) {
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
export const updateTransactions = /* GraphQL */ `
  mutation UpdateTransactions(
    $input: UpdateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    updateTransactions(input: $input, condition: $condition) {
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
export const deleteTransactions = /* GraphQL */ `
  mutation DeleteTransactions(
    $input: DeleteTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    deleteTransactions(input: $input, condition: $condition) {
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
export const createStudent = /* GraphQL */ `
  mutation CreateStudent(
    $input: CreateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    createStudent(input: $input, condition: $condition) {
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
export const updateStudent = /* GraphQL */ `
  mutation UpdateStudent(
    $input: UpdateStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    updateStudent(input: $input, condition: $condition) {
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
export const deleteStudent = /* GraphQL */ `
  mutation DeleteStudent(
    $input: DeleteStudentInput!
    $condition: ModelStudentConditionInput
  ) {
    deleteStudent(input: $input, condition: $condition) {
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
