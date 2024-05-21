import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";





type EagerTransactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sender?: string | null;
  readonly amount?: string | null;
  readonly receiver?: string | null;
  readonly students?: (StudentTransactions | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyTransactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Transactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly sender?: string | null;
  readonly amount?: string | null;
  readonly receiver?: string | null;
  readonly students: AsyncCollection<StudentTransactions>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Transactions = LazyLoading extends LazyLoadingDisabled ? EagerTransactions : LazyTransactions

export declare const Transactions: (new (init: ModelInit<Transactions>) => Transactions) & {
  copyOf(source: Transactions, mutator: (draft: MutableModel<Transactions>) => MutableModel<Transactions> | void): Transactions;
}

type EagerStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly balance: number;
  readonly isAdmin?: boolean | null;
  readonly Transactions?: (StudentTransactions | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudent = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Student, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly balance: number;
  readonly isAdmin?: boolean | null;
  readonly Transactions: AsyncCollection<StudentTransactions>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Student = LazyLoading extends LazyLoadingDisabled ? EagerStudent : LazyStudent

export declare const Student: (new (init: ModelInit<Student>) => Student) & {
  copyOf(source: Student, mutator: (draft: MutableModel<Student>) => MutableModel<Student> | void): Student;
}

type EagerStudentTransactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StudentTransactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly transactionsId?: string | null;
  readonly studentId?: string | null;
  readonly transactions: Transactions;
  readonly student: Student;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyStudentTransactions = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<StudentTransactions, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly transactionsId?: string | null;
  readonly studentId?: string | null;
  readonly transactions: AsyncItem<Transactions>;
  readonly student: AsyncItem<Student>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type StudentTransactions = LazyLoading extends LazyLoadingDisabled ? EagerStudentTransactions : LazyStudentTransactions

export declare const StudentTransactions: (new (init: ModelInit<StudentTransactions>) => StudentTransactions) & {
  copyOf(source: StudentTransactions, mutator: (draft: MutableModel<StudentTransactions>) => MutableModel<StudentTransactions> | void): StudentTransactions;
}