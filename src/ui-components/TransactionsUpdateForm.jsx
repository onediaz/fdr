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
import { getTransactions } from "../graphql/queries";
import { updateTransactions } from "../graphql/mutations";
const client = generateClient();
export default function TransactionsUpdateForm(props) {
  const {
    id: idProp,
    transactions: transactionsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    sender_id: "",
    receiver_id: "",
    amount: "",
    sender_name: "",
    receiver_name: "",
    message: "",
  };
  const [sender_id, setSender_id] = React.useState(initialValues.sender_id);
  const [receiver_id, setReceiver_id] = React.useState(
    initialValues.receiver_id
  );
  const [amount, setAmount] = React.useState(initialValues.amount);
  const [sender_name, setSender_name] = React.useState(
    initialValues.sender_name
  );
  const [receiver_name, setReceiver_name] = React.useState(
    initialValues.receiver_name
  );
  const [message, setMessage] = React.useState(initialValues.message);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = transactionsRecord
      ? { ...initialValues, ...transactionsRecord }
      : initialValues;
    setSender_id(cleanValues.sender_id);
    setReceiver_id(cleanValues.receiver_id);
    setAmount(cleanValues.amount);
    setSender_name(cleanValues.sender_name);
    setReceiver_name(cleanValues.receiver_name);
    setMessage(cleanValues.message);
    setErrors({});
  };
  const [transactionsRecord, setTransactionsRecord] = React.useState(
    transactionsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getTransactions.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getTransactions
        : transactionsModelProp;
      setTransactionsRecord(record);
    };
    queryData();
  }, [idProp, transactionsModelProp]);
  React.useEffect(resetStateValues, [transactionsRecord]);
  const validations = {
    sender_id: [],
    receiver_id: [],
    amount: [],
    sender_name: [],
    receiver_name: [],
    message: [],
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
          sender_id: sender_id ?? null,
          receiver_id: receiver_id ?? null,
          amount: amount ?? null,
          sender_name: sender_name ?? null,
          receiver_name: receiver_name ?? null,
          message: message ?? null,
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
            query: updateTransactions.replaceAll("__typename", ""),
            variables: {
              input: {
                id: transactionsRecord.id,
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
      {...getOverrideProps(overrides, "TransactionsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Sender id"
        isRequired={false}
        isReadOnly={false}
        value={sender_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender_id: value,
              receiver_id,
              amount,
              sender_name,
              receiver_name,
              message,
            };
            const result = onChange(modelFields);
            value = result?.sender_id ?? value;
          }
          if (errors.sender_id?.hasError) {
            runValidationTasks("sender_id", value);
          }
          setSender_id(value);
        }}
        onBlur={() => runValidationTasks("sender_id", sender_id)}
        errorMessage={errors.sender_id?.errorMessage}
        hasError={errors.sender_id?.hasError}
        {...getOverrideProps(overrides, "sender_id")}
      ></TextField>
      <TextField
        label="Receiver id"
        isRequired={false}
        isReadOnly={false}
        value={receiver_id}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender_id,
              receiver_id: value,
              amount,
              sender_name,
              receiver_name,
              message,
            };
            const result = onChange(modelFields);
            value = result?.receiver_id ?? value;
          }
          if (errors.receiver_id?.hasError) {
            runValidationTasks("receiver_id", value);
          }
          setReceiver_id(value);
        }}
        onBlur={() => runValidationTasks("receiver_id", receiver_id)}
        errorMessage={errors.receiver_id?.errorMessage}
        hasError={errors.receiver_id?.hasError}
        {...getOverrideProps(overrides, "receiver_id")}
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
              sender_id,
              receiver_id,
              amount: value,
              sender_name,
              receiver_name,
              message,
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
      <TextField
        label="Sender name"
        isRequired={false}
        isReadOnly={false}
        value={sender_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender_id,
              receiver_id,
              amount,
              sender_name: value,
              receiver_name,
              message,
            };
            const result = onChange(modelFields);
            value = result?.sender_name ?? value;
          }
          if (errors.sender_name?.hasError) {
            runValidationTasks("sender_name", value);
          }
          setSender_name(value);
        }}
        onBlur={() => runValidationTasks("sender_name", sender_name)}
        errorMessage={errors.sender_name?.errorMessage}
        hasError={errors.sender_name?.hasError}
        {...getOverrideProps(overrides, "sender_name")}
      ></TextField>
      <TextField
        label="Receiver name"
        isRequired={false}
        isReadOnly={false}
        value={receiver_name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender_id,
              receiver_id,
              amount,
              sender_name,
              receiver_name: value,
              message,
            };
            const result = onChange(modelFields);
            value = result?.receiver_name ?? value;
          }
          if (errors.receiver_name?.hasError) {
            runValidationTasks("receiver_name", value);
          }
          setReceiver_name(value);
        }}
        onBlur={() => runValidationTasks("receiver_name", receiver_name)}
        errorMessage={errors.receiver_name?.errorMessage}
        hasError={errors.receiver_name?.hasError}
        {...getOverrideProps(overrides, "receiver_name")}
      ></TextField>
      <TextField
        label="Message"
        isRequired={false}
        isReadOnly={false}
        value={message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              sender_id,
              receiver_id,
              amount,
              sender_name,
              receiver_name,
              message: value,
            };
            const result = onChange(modelFields);
            value = result?.message ?? value;
          }
          if (errors.message?.hasError) {
            runValidationTasks("message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("message", message)}
        errorMessage={errors.message?.errorMessage}
        hasError={errors.message?.hasError}
        {...getOverrideProps(overrides, "message")}
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
          isDisabled={!(idProp || transactionsModelProp)}
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
              !(idProp || transactionsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
