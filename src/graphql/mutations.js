/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTransactions = /* GraphQL */ `
  mutation CreateTransactions(
    $input: CreateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    createTransactions(input: $input, condition: $condition) {
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
export const updateTransactions = /* GraphQL */ `
  mutation UpdateTransactions(
    $input: UpdateTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    updateTransactions(input: $input, condition: $condition) {
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
export const deleteTransactions = /* GraphQL */ `
  mutation DeleteTransactions(
    $input: DeleteTransactionsInput!
    $condition: ModelTransactionsConditionInput
  ) {
    deleteTransactions(input: $input, condition: $condition) {
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
export const createStudentTransactions = /* GraphQL */ `
  mutation CreateStudentTransactions(
    $input: CreateStudentTransactionsInput!
    $condition: ModelStudentTransactionsConditionInput
  ) {
    createStudentTransactions(input: $input, condition: $condition) {
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
export const updateStudentTransactions = /* GraphQL */ `
  mutation UpdateStudentTransactions(
    $input: UpdateStudentTransactionsInput!
    $condition: ModelStudentTransactionsConditionInput
  ) {
    updateStudentTransactions(input: $input, condition: $condition) {
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
export const deleteStudentTransactions = /* GraphQL */ `
  mutation DeleteStudentTransactions(
    $input: DeleteStudentTransactionsInput!
    $condition: ModelStudentTransactionsConditionInput
  ) {
    deleteStudentTransactions(input: $input, condition: $condition) {
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
