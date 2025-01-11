import { useState } from "react";
import {
  DescriptionInputSchema,
  NameInputSchema,
  PriceInputSchema,
} from "shared";
import { ZodIssue, ZodSchema } from "zod";

type AddItemFormComponentProps = {
  onSubmit: CallableFunction;
};

export default function AddItemForm({ onSubmit }: AddItemFormComponentProps) {
  const [name, setName] = useState("Default");
  const [description, setDescription] = useState(
    "Default description of the price"
  );
  const [price, setPrice] = useState(2);

  const [errors, setErrors] = useState<any[]>([]);

  function validateInput(
    e: React.ChangeEvent<HTMLInputElement>,
    schema: ZodSchema
  ) {
    const value = e.target.value;
    const fieldName = e.target.name;
    try {
      schema.parse(value);
      setErrors((prev) => prev.filter((err) => err.path !== fieldName));
    } catch (e: any) {
      console.error(e);
      const formattedErrors = e.errors.map((error: ZodIssue) => ({
        path: fieldName,
        message: error.message,
      }));
      setErrors((prevErrors) => [
        ...prevErrors.filter((err) => err.path !== fieldName),
        ...formattedErrors,
      ]);
    } finally {
      switch (fieldName) {
        case "name":
          setName(value);
          break;
        case "description":
          setDescription(value);
          break;
        case "price":
          setPrice(parseInt(value));
          break;
      }
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
            onChange={(e) => validateInput(e, NameInputSchema)}
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
            onChange={(e) => validateInput(e, DescriptionInputSchema)}
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
            onChange={(e) => validateInput(e, PriceInputSchema)}
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
