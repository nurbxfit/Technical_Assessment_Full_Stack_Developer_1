import { useEffect, useState } from "react";
import { itemService } from "./services/ItemService";
import ItemCard from "./components/ItemCard";
import AddItemForm from "./components/AddItemForm";
import { ItemType } from "shared";
import UpdateItemForm from "./components/UpdateItemForm";
import { storeController } from "./stores";
import { useSelector } from "react-redux";
import Toast from "./components/Toast";
import Modal from "./components/Modal";
import { Modal as ModalType } from "./stores/components.slice";
import ConfirmationBox from "./components/ConfirmationBox";

function App() {
  type Item = ItemType & {
    id: number;
  };

  const items = useSelector((state: { items: Item[] }) => state.items);
  const modal = useSelector((state: { modal: ModalType }) => state.modal);
  const [editingItem, setEditingItem] = useState<null | Item>();
  const [deletingItem, setDeletingItem] = useState<null | Item>();

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (!modal.isOpen) {
      setEditingItem(null);
      setDeletingItem(null);
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
        message: "Item added",
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

  function handleClickDelete(itemId: number) {
    const deletingItem = items.find((item) => item.id == itemId);
    setDeletingItem(deletingItem);
    storeController.openModal();
  }

  function handleConfirmDelete() {
    if (deletingItem) {
      handleItemDelete(deletingItem.id);
    }
    storeController.closeModal();
    setDeletingItem(null);
  }

  function handleCancelDelete() {
    storeController.closeModal();
    setDeletingItem(null);
  }

  async function handleItemDelete(itemId: number) {
    try {
      const deleteItemResponse = await itemService.deleteItem(itemId);
      storeController.deleteItem(deleteItemResponse.id);
      storeController.showToast({
        message: "Item deleted",
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
        message: "Item updated",
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
        {items.length > 0 && (
          <ul className=" w-full rounded-sm bg-gray-200 p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                onDelete={handleClickDelete}
                onClickEdit={handleClickEdit}
              />
            ))}
          </ul>
        )}

        {items.length == 0 && (
          <h1 className="text-gray-400 italic text-2xl">No Item availble</h1>
        )}
      </div>

      <button
        className="fixed bottom-6 right-6 bg-blue-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-105"
        onClick={() => storeController.openModal()}
        aria-label="Add Item"
      >
        +
      </button>

      <Modal>
        {!editingItem && !deletingItem && (
          <AddItemForm onSubmit={handleItemSubmit} />
        )}
        {editingItem && (
          <div>
            <UpdateItemForm
              onSubmit={handleUpdateItem}
              defaultValues={editingItem}
            />
          </div>
        )}

        {deletingItem && (
          <ConfirmationBox
            title={`Deleting ${deletingItem.name}`}
            subtitle="This action is permenant!"
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
