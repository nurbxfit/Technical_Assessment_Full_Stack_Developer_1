import React, { useCallback, useState } from "react";
import {
  debounce,
  DescriptionInputSchema,
  NameInputSchema,
  PriceInputSchema,
} from "shared";
import { ZodIssue, ZodSchema } from "zod";

type AddItemFormComponentProps = {
  onSubmit: CallableFunction;
};

export default function AddItemForm({ onSubmit }: AddItemFormComponentProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState<any[]>([]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const fieldName = e.target.name;

    switch (fieldName) {
      case "name":
        setName(value);
        validateInputWithDebounce({ value, fieldName }, NameInputSchema);
        break;
      case "description":
        setDescription(value);
        validateInputWithDebounce({ value, fieldName }, DescriptionInputSchema);
        break;
      case "price":
        setPrice(value);
        validateInputWithDebounce({ value, fieldName }, PriceInputSchema);
        break;
    }
  }

  const validateInputWithDebounce = useCallback(
    debounce(validateInput, 500),
    []
  );

  function validateInput(
    { value, fieldName }: { value: any; fieldName: string },
    schema: ZodSchema
  ) {
    try {
      schema.parse(value);
      setErrors((prev) => prev.filter((err) => err.path !== fieldName));
    } catch (e: any) {
      // console.error(e);
      const formattedErrors = e.errors.map((error: ZodIssue) => ({
        path: fieldName,
        message: error.message,
      }));
      setErrors((prevErrors) => [
        ...prevErrors.filter((err) => err.path !== fieldName),
        ...formattedErrors,
      ]);
    }
  }

  function getErrorByFieldName(fieldName: string) {
    return errors.find((err) => err.path == fieldName)?.message || "";
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof onSubmit == "function") {
      onSubmit({
        name: name,
        description: description,
        price: price,
      });
    }
  }
  return (
    <div
      style={{
        padding: "20px",
        borderStyle: "solid",
        borderColor: "whitesmoke",
      }}
    >
      {/* {JSON.stringify(errors)} */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            id="itemName"
            name="name"
            value={name}
            maxLength={100}
            onChange={handleInputChange}
          />
          <div>
            <small style={{ color: "red" }}>
              {getErrorByFieldName("name")}
            </small>
          </div>
        </div>
        <div>
          <label>Description:</label>
          <input
            id="description"
            name="description"
            value={description}
            maxLength={500}
            onChange={handleInputChange}
          />
          <div>
            <small style={{ color: "red" }}>
              {getErrorByFieldName("description")}
            </small>
          </div>
        </div>
        <div>
          <label>Price:</label>
          <input
            id="price"
            name="price"
            value={price}
            type="number"
            onChange={handleInputChange}
          />
          <div>
            <small style={{ color: "red" }}>
              {getErrorByFieldName("price")}
            </small>
          </div>
        </div>

        <button disabled={errors.length > 0} type="submit">
          submit
        </button>
      </form>
    </div>
  );
}
