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
      storeController.showToast({
        id: item.id.toString(),
        message: `New item: ${item.name}`,
        cooldown: 2,
      });
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
    <>
      <Toast />
      <div>
        <ul>
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onDelete={handleItemDelete}
              onClickEdit={handleClickEdit}
            />
          ))}
        </ul>
        <div>{!editingItem && <AddItemForm onSubmit={handleItemSubmit} />}</div>
        <div>
          {editingItem && (
            <UpdateItemForm
              onSubmit={handleUpdateItem}
              defaultValues={editingItem}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
