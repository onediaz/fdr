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
export declare type TransactionsUpdateFormInputValues = {
    sender_id?: string;
    receiver_id?: string;
    amount?: number;
    sender_name?: string;
    receiver_name?: string;
    message?: string;
    likes?: string;
};
export declare type TransactionsUpdateFormValidationValues = {
    sender_id?: ValidationFunction<string>;
    receiver_id?: ValidationFunction<string>;
    amount?: ValidationFunction<number>;
    sender_name?: ValidationFunction<string>;
    receiver_name?: ValidationFunction<string>;
    message?: ValidationFunction<string>;
    likes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionsUpdateFormOverridesProps = {
    TransactionsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sender_id?: PrimitiveOverrideProps<TextFieldProps>;
    receiver_id?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    sender_name?: PrimitiveOverrideProps<TextFieldProps>;
    receiver_name?: PrimitiveOverrideProps<TextFieldProps>;
    message?: PrimitiveOverrideProps<TextFieldProps>;
    likes?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type TransactionsUpdateFormProps = React.PropsWithChildren<{
    overrides?: TransactionsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    transactions?: any;
    onSubmit?: (fields: TransactionsUpdateFormInputValues) => TransactionsUpdateFormInputValues;
    onSuccess?: (fields: TransactionsUpdateFormInputValues) => void;
    onError?: (fields: TransactionsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: TransactionsUpdateFormInputValues) => TransactionsUpdateFormInputValues;
    onValidate?: TransactionsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function TransactionsUpdateForm(props: TransactionsUpdateFormProps): React.ReactElement;
