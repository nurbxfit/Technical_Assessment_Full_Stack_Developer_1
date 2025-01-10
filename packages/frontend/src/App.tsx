import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";

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

  async function handleItemSubmitted(event: any) {
    console.log("event:", event);
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
        <AddItemForm onSubmit={handleItemSubmitted} />
      </div>
    </>
  );
}

export default App;
