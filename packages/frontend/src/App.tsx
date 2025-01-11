import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";
import UpdateItemForm from "./components/UpdateItemForm";

function App() {
  type Item = ItemType & {
    id: number;
  };
  const [items, setItems] = useState<any[]>([]);
  const [editingItem, setEditingItem] = useState<null | Item>();

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    const itemsResponse = await itemService.getItems();
    console.log("ItemsResponse:", itemsResponse);
    setItems(() => itemsResponse);
  }

  async function handleItemSubmit(item: ItemType) {
    console.log("event:", item);
    try {
      const createItemResponse = await itemService.createItem(item);
      console.log("created:", createItemResponse);
    } catch (error) {
      console.log("Error:", error);
    }
  }

  async function handleItemDelete(itemId: number) {
    try {
      const deleteItemResponse = await itemService.deleteItem(itemId);
      console.log("deleted:", deleteItemResponse);
    } catch (error) {
      console.log("DeleteError:", error);
    }
  }

  function handleClickEdit(item: Item) {
    console.log("Editing:", item);
    setEditingItem(() => item);
  }

  async function handleUpdateItem(item: any) {
    try {
      const editedItemResponse =
        editingItem && (await itemService.updateItem(editingItem.id, item));
      console.log("updated:", editedItemResponse);
    } catch (error) {
      console.log("UpdateError:", error);
    }
    console.log("updating:item:", item);
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
