/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getStudentTable } from "../graphql/queries";
import { updateStudentTable } from "../graphql/mutations";
const client = generateClient();
export default function StudentTableUpdateForm(props) {
  const {
    id: idProp,
    studentTable: studentTableModelProp,
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
    students: "",
    classroom: "",
  };
  const [name, setName] = React.useState(initialValues.name);
  const [students, setStudents] = React.useState(initialValues.students);
  const [classroom, setClassroom] = React.useState(initialValues.classroom);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = studentTableRecord
      ? { ...initialValues, ...studentTableRecord }
      : initialValues;
    setName(cleanValues.name);
    setStudents(cleanValues.students);
    setClassroom(cleanValues.classroom);
    setErrors({});
  };
  const [studentTableRecord, setStudentTableRecord] = React.useState(
    studentTableModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getStudentTable.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getStudentTable
        : studentTableModelProp;
      setStudentTableRecord(record);
    };
    queryData();
  }, [idProp, studentTableModelProp]);
  React.useEffect(resetStateValues, [studentTableRecord]);
  const validations = {
    name: [],
    students: [],
    classroom: [],
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
          students: students ?? null,
          classroom: classroom ?? null,
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
            query: updateStudentTable.replaceAll("__typename", ""),
            variables: {
              input: {
                id: studentTableRecord.id,
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
      {...getOverrideProps(overrides, "StudentTableUpdateForm")}
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
              students,
              classroom,
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
      <TextField
        label="Students"
        isRequired={false}
        isReadOnly={false}
        value={students}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              students: value,
              classroom,
            };
            const result = onChange(modelFields);
            value = result?.students ?? value;
          }
          if (errors.students?.hasError) {
            runValidationTasks("students", value);
          }
          setStudents(value);
        }}
        onBlur={() => runValidationTasks("students", students)}
        errorMessage={errors.students?.errorMessage}
        hasError={errors.students?.hasError}
        {...getOverrideProps(overrides, "students")}
      ></TextField>
      <TextField
        label="Classroom"
        isRequired={false}
        isReadOnly={false}
        value={classroom}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              students,
              classroom: value,
            };
            const result = onChange(modelFields);
            value = result?.classroom ?? value;
          }
          if (errors.classroom?.hasError) {
            runValidationTasks("classroom", value);
          }
          setClassroom(value);
        }}
        onBlur={() => runValidationTasks("classroom", classroom)}
        errorMessage={errors.classroom?.errorMessage}
        hasError={errors.classroom?.hasError}
        {...getOverrideProps(overrides, "classroom")}
      ></TextField>
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
          isDisabled={!(idProp || studentTableModelProp)}
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
              !(idProp || studentTableModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
