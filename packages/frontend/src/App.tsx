import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";
import UpdateItemForm from "./components/UpdateItemForm";
import { storeController } from "./stores";
import { useSelector } from "react-redux";

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
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleItemDelete(itemId: number) {
    try {
      const deleteItemResponse = await itemService.deleteItem(itemId);
      storeController.deleteItem(deleteItemResponse.id);
    } catch (error) {
      console.log("DeleteError:", error);
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
      setEditingItem(() => null);
    } catch (error) {
      console.log("UpdateError:", error);
    }
  }

  return (
    <>
      <h1>Hello World</h1>
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
    </>
  );
}

export default App;
