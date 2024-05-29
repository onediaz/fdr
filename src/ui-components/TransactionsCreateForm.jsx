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
import { createTransactions } from "../graphql/mutations";
const client = generateClient();
export default function TransactionsCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    sender: "",
    receiver: "",
    amount: "",
  };
  const [sender, setSender] = React.useState(initialValues.sender);
  const [receiver, setReceiver] = React.useState(initialValues.receiver);
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setSender(initialValues.sender);
    setReceiver(initialValues.receiver);
    setAmount(initialValues.amount);
    setErrors({});
  };
  const validations = {
    sender: [],
    receiver: [],
    amount: [],
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
          sender,
          receiver,
          amount,
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
            query: createTransactions.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "TransactionsCreateForm")}
      {...rest}
    >
      <TextField
        label="Sender"
        isRequired={false}
        isReadOnly={false}
        value={sender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender: value,
              receiver,
              amount,
            };
            const result = onChange(modelFields);
            value = result?.sender ?? value;
          }
          if (errors.sender?.hasError) {
            runValidationTasks("sender", value);
          }
          setSender(value);
        }}
        onBlur={() => runValidationTasks("sender", sender)}
        errorMessage={errors.sender?.errorMessage}
        hasError={errors.sender?.hasError}
        {...getOverrideProps(overrides, "sender")}
      ></TextField>
      <TextField
        label="Receiver"
        isRequired={false}
        isReadOnly={false}
        value={receiver}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender,
              receiver: value,
              amount,
            };
            const result = onChange(modelFields);
            value = result?.receiver ?? value;
          }
          if (errors.receiver?.hasError) {
            runValidationTasks("receiver", value);
          }
          setReceiver(value);
        }}
        onBlur={() => runValidationTasks("receiver", receiver)}
        errorMessage={errors.receiver?.errorMessage}
        hasError={errors.receiver?.hasError}
        {...getOverrideProps(overrides, "receiver")}
      ></TextField>
      <TextField
        label="Amount"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={amount}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              sender,
              receiver,
              amount: value,
            };
            const result = onChange(modelFields);
            value = result?.amount ?? value;
          }
          if (errors.amount?.hasError) {
            runValidationTasks("amount", value);
          }
          setAmount(value);
        }}
        onBlur={() => runValidationTasks("amount", amount)}
        errorMessage={errors.amount?.errorMessage}
        hasError={errors.amount?.hasError}
        {...getOverrideProps(overrides, "amount")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
