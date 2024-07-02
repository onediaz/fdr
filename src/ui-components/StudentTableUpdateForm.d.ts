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
export declare type StudentTableUpdateFormInputValues = {
    name?: string;
    students?: string;
    classroom?: string;
};
export declare type StudentTableUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    students?: ValidationFunction<string>;
    classroom?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentTableUpdateFormOverridesProps = {
    StudentTableUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    students?: PrimitiveOverrideProps<TextFieldProps>;
    classroom?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentTableUpdateFormProps = React.PropsWithChildren<{
    overrides?: StudentTableUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    studentTable?: any;
    onSubmit?: (fields: StudentTableUpdateFormInputValues) => StudentTableUpdateFormInputValues;
    onSuccess?: (fields: StudentTableUpdateFormInputValues) => void;
    onError?: (fields: StudentTableUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentTableUpdateFormInputValues) => StudentTableUpdateFormInputValues;
    onValidate?: StudentTableUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StudentTableUpdateForm(props: StudentTableUpdateFormProps): React.ReactElement;
