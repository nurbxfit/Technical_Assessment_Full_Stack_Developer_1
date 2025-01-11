import { useItemForm } from "../hooks/useItemForm";

type AddItemFormComponentProps = {
  onSubmit: CallableFunction;
};

export default function AddItemForm({ onSubmit }: AddItemFormComponentProps) {
  const {
    name,
    description,
    price,
    errors,
    getErrorByFieldName,
    handleInputChange,
  } = useItemForm({});

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
