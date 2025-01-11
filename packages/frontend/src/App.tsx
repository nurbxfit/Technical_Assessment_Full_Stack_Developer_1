import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";
import UpdateItemForm from "./components/UpdateItemForm";
import { storeController } from "./stores";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";

function App() {
  type Item = ItemType & {
    id: number;
  };
  // const [items, setItems] = useState<any[]>([]);
  const items = useSelector((state: { items: Item[] }) => state.items);

  const [editingItem, setEditingItem] = useState<null | Item>();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const itemsResponse = await itemService.getItems();
    console.log("ItemsResponse:", itemsResponse);
    itemsResponse.forEach((item: Item) => {
      storeController.addItem(item);
    });
    // setItems(() => itemsResponse);
  }

  async function handleItemSubmit(item: ItemType) {
    try {
      const createItemResponse = await itemService.createItem(item);
      storeController.addItem(createItemResponse);
      storeController.showToast({
        message: "Added Item",
        type: "success",
      });
    } catch (error: any) {
      console.log("Error:", error);
      storeController.showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  async function handleItemDelete(itemId: number) {
    try {
      const deleteItemResponse = await itemService.deleteItem(itemId);
      storeController.deleteItem(deleteItemResponse.id);
      storeController.showToast({
        message: "Deleted Item",
        type: "warning",
      });
    } catch (error: any) {
      console.log("DeleteError:", error);
      storeController.showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  function handleClickEdit(item: Item) {
    setEditingItem(() => item);
  }

  async function handleUpdateItem(item: any) {
    try {
      const editedItemResponse =
        editingItem && (await itemService.updateItem(editingItem.id, item));
      console.log("updated:", editedItemResponse);
      storeController.updateItem(editedItemResponse.id, editedItemResponse);
      storeController.showToast({
        message: "Updated Item",
        type: "success",
      });
      setEditingItem(() => null);
    } catch (error: any) {
      console.log("UpdateError:", error);
      storeController.showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <Toast />
      <div className="flex flex-1 flex-wrap md:flex-nowrap">
        <div className="w-full md:w-1/2 h-full bg-gradient-to-tr from-blue-800 to-purple-700 p-4 overflow-y-auto">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={handleItemDelete}
                onClickEdit={handleClickEdit}
              />
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <div className="max-w-md mx-auto">
            {!editingItem && <AddItemForm onSubmit={handleItemSubmit} />}
            {editingItem && (
              <div>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-blue-500 hover:underline"
                >
                  &larr; Cancel
                </button>
                <UpdateItemForm
                  onSubmit={handleUpdateItem}
                  defaultValues={editingItem}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
