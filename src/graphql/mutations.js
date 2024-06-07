/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
export const createTransactionsStudent = /* GraphQL */ `
  mutation CreateTransactionsStudent(
    $input: CreateTransactionsStudentInput!
    $condition: ModelTransactionsStudentConditionInput
  ) {
    createTransactionsStudent(input: $input, condition: $condition) {
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
export const updateTransactionsStudent = /* GraphQL */ `
  mutation UpdateTransactionsStudent(
    $input: UpdateTransactionsStudentInput!
    $condition: ModelTransactionsStudentConditionInput
  ) {
    updateTransactionsStudent(input: $input, condition: $condition) {
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
export const deleteTransactionsStudent = /* GraphQL */ `
  mutation DeleteTransactionsStudent(
    $input: DeleteTransactionsStudentInput!
    $condition: ModelTransactionsStudentConditionInput
  ) {
    deleteTransactionsStudent(input: $input, condition: $condition) {
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
