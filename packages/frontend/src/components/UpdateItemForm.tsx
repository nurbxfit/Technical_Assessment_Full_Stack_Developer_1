import { useItemForm } from "../hooks/useItemForm";

type UpdateItemFormComponentProps = {
  onSubmit: CallableFunction;
  defaultValues: {
    name?: string;
    description?: string;
    price?: number;
  };
};

// this component still maintain some duplication with AddItemForm,
// even tho I already refactored some of the logic into useItemForm hooks
// right now I just copy paste the content from AdditemForm.
// maybe I will change this in future, maybe just make the AddItemForm into a generic ItemForm ?
export default function UpdateItemForm({
  onSubmit,
  defaultValues,
}: UpdateItemFormComponentProps) {
  const {
    name,
    description,
    price,
    errors,
    getErrorByFieldName,
    handleInputChange,
  } = useItemForm({ defaults: defaultValues });

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
    <div className="p-6 border border-gray-200 rounded-lg shadow-md">
      {/* {JSON.stringify(errors)} */}
      <form className="mt-1 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName" className="block text-lg font-medium mb-1">
            Name
          </label>
          <input
            id="itemName"
            name="name"
            value={name}
            maxLength={100}
            onChange={handleInputChange}
            placeholder="Item name"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus::outline-none focus:ring-2 focus: ring-blue-500"
          />
          {getErrorByFieldName("name") && (
            <small className="text-red-600">
              {getErrorByFieldName("name")}
            </small>
          )}
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            maxLength={500}
            onChange={handleInputChange}
            placeholder="Enter item description"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          {getErrorByFieldName("description") && (
            <small className="text-red-600">
              {getErrorByFieldName("description")}
            </small>
          )}
        </div>

        <div>
          <label htmlFor="price" className="block text-lg font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            name="price"
            value={price}
            type="number"
            onChange={handleInputChange}
            placeholder="Enter price"
            className="w-full border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {getErrorByFieldName("price") && (
            <small className="text-red-600">
              {getErrorByFieldName("price")}
            </small>
          )}
        </div>

        <button
          disabled={errors.length > 0}
          type="submit"
          className={`mt-4 w-full py-2 rounded-lg text-white ${
            errors.length > 0 ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Update
        </button>
      </form>
    </div>
  );
}
