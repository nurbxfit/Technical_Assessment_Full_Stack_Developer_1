import React, { useCallback, useState } from "react";
import {
  debounce,
  DescriptionInputSchema,
  NameInputSchema,
  PriceInputSchema,
} from "shared";
import { ZodIssue, ZodSchema } from "zod";

type UseItemFormParams = {
  defaults?: {
    name?: string;
    description?: string;
    price?: number;
  };
};

/**
 * previously refactored AddItemForm component, trasfer the input logic here into a re-usable hooks,
 * doing this so that I can just re-use the logic in UpdateItemForm component.
 * not sure if this hook will exist after implement redux, we'll see
 */
export function useItemForm({ defaults = {} }: UseItemFormParams) {
  const [name, setName] = useState(defaults.name || "");
  const [description, setDescription] = useState(defaults.description || "");
  const [price, setPrice] = useState(defaults.price || "");

  const [errors, setErrors] = useState<any[]>([]);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
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

  return {
    name,
    description,
    price,
    errors,
    handleInputChange,
    getErrorByFieldName,
  };
}
