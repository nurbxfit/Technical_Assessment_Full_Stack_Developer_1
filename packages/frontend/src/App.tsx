import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";
import UpdateItemForm from "./components/UpdateItemForm";
import { storeController } from "./stores";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";
import Modal from "./components/Modal"; // Import the Modal component
import { Modal as ModalType } from "./stores/components.slice";

function App() {
  type Item = ItemType & {
    id: number;
  };

  const items = useSelector((state: { items: Item[] }) => state.items);
  const modal = useSelector((state: { modal: ModalType }) => state.modal);
  const [editingItem, setEditingItem] = useState<null | Item>();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (!modal.isOpen) {
      setEditingItem(null);
    }
  }, [modal.isOpen]);

  async function fetchItems() {
    const itemsResponse = await itemService.getItems();
    itemsResponse.forEach((item: Item) => {
      storeController.addItem(item);
    });
  }

  async function handleItemSubmit(item: ItemType) {
    try {
      const createItemResponse = await itemService.createItem(item);
      storeController.addItem(createItemResponse);
      storeController.showToast({
        message: "Added Item",
        type: "success",
      });
      storeController.closeModal(); // Close modal after submission
    } catch (error: any) {
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
      storeController.showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  function handleClickEdit(item: Item) {
    setEditingItem(() => item);
    storeController.openModal();
  }

  async function handleUpdateItem(item: any) {
    try {
      const editedItemResponse =
        editingItem && (await itemService.updateItem(editingItem.id, item));
      storeController.updateItem(editedItemResponse.id, editedItemResponse);
      storeController.showToast({
        message: "Updated Item",
        type: "success",
      });
      storeController.closeModal();
      setEditingItem(() => null);
    } catch (error: any) {
      storeController.showToast({
        message: error.message,
        type: "error",
      });
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      <Toast />

      <div className="w-full bg-white text-gray-900 py-4 px-6 flex justify-between items-center shadow-md fixed">
        <h1 className="text-lg font-bold">Arkmind Demo</h1>
      </div>

      <div className="w-full flex-grow px-4 py-6 mt-12">
        <ul className=" w-full rounded-sm bg-gray-200 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={() => storeController.openModal()}
        aria-label="Add Item"
      >
        +
      </button>

      <Modal>
        {!editingItem && <AddItemForm onSubmit={handleItemSubmit} />}
        {editingItem && (
          <div>
            <UpdateItemForm
              onSubmit={handleUpdateItem}
              defaultValues={editingItem}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;
