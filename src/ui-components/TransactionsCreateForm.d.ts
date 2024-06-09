/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type TransactionsCreateFormInputValues = {
    sender_id?: string;
    receiver_id?: string;
    amount?: number;
    sender_name?: string;
    receiver_name?: string;
    message?: string;
    likes?: string;
};
export declare type TransactionsCreateFormValidationValues = {
    sender_id?: ValidationFunction<string>;
    receiver_id?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    sender_name?: ValidationFunction<string>;
    receiver_name?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionsCreateFormOverridesProps = {
    TransactionsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sender_id?: PrimitiveOverrideProps<TextFieldProps>;
    receiver_id?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    sender_name?: PrimitiveOverrideProps<TextFieldProps>;
    receiver_name?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TransactionsCreateFormProps = React.PropsWithChildren<{
    overrides?: TransactionsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: TransactionsCreateFormInputValues) => TransactionsCreateFormInputValues;
    onSuccess?: (fields: TransactionsCreateFormInputValues) => void;
    onError?: (fields: TransactionsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionsCreateFormInputValues) => TransactionsCreateFormInputValues;
    onValidate?: TransactionsCreateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionsCreateForm(props: TransactionsCreateFormProps): React.ReactElement;
