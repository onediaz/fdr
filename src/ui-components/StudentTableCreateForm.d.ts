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
export declare type StudentTableCreateFormInputValues = {
    name?: string;
    students?: string;
    classroom?: string;
};
export declare type StudentTableCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    students?: ValidationFunction<string>;
    classroom?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentTableCreateFormOverridesProps = {
    StudentTableCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    students?: PrimitiveOverrideProps<TextAreaFieldProps>;
    classroom?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentTableCreateFormProps = React.PropsWithChildren<{
    overrides?: StudentTableCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StudentTableCreateFormInputValues) => StudentTableCreateFormInputValues;
    onSuccess?: (fields: StudentTableCreateFormInputValues) => void;
    onError?: (fields: StudentTableCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentTableCreateFormInputValues) => StudentTableCreateFormInputValues;
    onValidate?: StudentTableCreateFormValidationValues;
} & React.CSSProperties>;
export default function StudentTableCreateForm(props: StudentTableCreateFormProps): React.ReactElement;
