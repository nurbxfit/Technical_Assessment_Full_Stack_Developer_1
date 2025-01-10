type AddItemFormComponentProps = {
  onSubmit: CallableFunction;
};

export default function AddItemForm({ onSubmit }: AddItemFormComponentProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (typeof onSubmit == "function") {
      const form = event.currentTarget;
      const formElements = form.elements as HTMLFormControlsCollection & {
        itemName: { value: string };
        description: { value: string };
        price: { value: string };
      };
      onSubmit({
        name: formElements.itemName.value,
        description: formElements.description.value,
        price: formElements.price.value,
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input id="itemName" name="name" />
        </div>
        <div>
          <label>Description:</label>
          <input id="description" name="description" />
        </div>
        <div>
          <label>Price:</label>
          <input id="price" name="price" />
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
