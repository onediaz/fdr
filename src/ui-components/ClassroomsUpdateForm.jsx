/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getClassrooms } from "../graphql/queries";
import { updateClassrooms } from "../graphql/mutations";
const client = generateClient();
export default function ClassroomsUpdateForm(props) {
  const {
    id: idProp,
    classrooms: classroomsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: "",
    tables: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [tables, setTables] = React.useState(initialValues.tables);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = classroomsRecord
      ? { ...initialValues, ...classroomsRecord }
      : initialValues;
    setName(cleanValues.name);
    setTables(
      typeof cleanValues.tables === "string" || cleanValues.tables === null
        ? cleanValues.tables
        : JSON.stringify(cleanValues.tables)
    );
    setErrors({});
  };
  const [classroomsRecord, setClassroomsRecord] =
    React.useState(classroomsModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getClassrooms.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getClassrooms
        : classroomsModelProp;
      setClassroomsRecord(record);
    };
    queryData();
  }, [idProp, classroomsModelProp]);
  React.useEffect(resetStateValues, [classroomsRecord]);
  const validations = {
    name: [],
    tables: [{ type: "JSON" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          name: name ?? null,
          tables: tables ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateClassrooms.replaceAll("__typename", ""),
            variables: {
              input: {
                id: classroomsRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ClassroomsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              tables,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextAreaField
        label="Tables"
        isRequired={false}
        isReadOnly={false}
        value={tables}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              tables: value,
            };
            const result = onChange(modelFields);
            value = result?.tables ?? value;
          }
          if (errors.tables?.hasError) {
            runValidationTasks("tables", value);
          }
          setTables(value);
        }}
        onBlur={() => runValidationTasks("tables", tables)}
        errorMessage={errors.tables?.errorMessage}
        hasError={errors.tables?.hasError}
        {...getOverrideProps(overrides, "tables")}
      ></TextAreaField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || classroomsModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || classroomsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
