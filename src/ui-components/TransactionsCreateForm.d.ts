/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
    sender?: string;
    amount?: string;
    receiver?: string;
};
export declare type TransactionsCreateFormValidationValues = {
    sender?: ValidationFunction<string>;
    amount?: ValidationFunction<string>;
    receiver?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type TransactionsCreateFormOverridesProps = {
    TransactionsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    sender?: PrimitiveOverrideProps<TextFieldProps>;
    amount?: PrimitiveOverrideProps<TextFieldProps>;
    receiver?: PrimitiveOverrideProps<TextFieldProps>;
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
