import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";

function App() {
  const [items, setItems] = useState<any[]>([]);

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
  return (
    <>
      <h1>Hello World</h1>
      <ul>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </ul>
      <div>
        <AddItemForm onSubmit={handleItemSubmit} />
      </div>
    </>
  );
}

export default App;
