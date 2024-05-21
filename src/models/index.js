// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Transactions, Student, StudentTransactions } = initSchema(schema);

export {
  Transactions,
  Student,
  StudentTransactions
};