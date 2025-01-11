import { PropsWithChildren } from "react";
import { ItemType } from "shared";

type Item = ItemType & {
  id: number;
};

type ItemCardComponentProps = PropsWithChildren & {
  item: Item;
  onDelete?: (id: number) => void;
  onClickEdit?: (item: Item) => any;
};

export default function ItemCard({
  item,
  onDelete,
  onClickEdit,
}: ItemCardComponentProps) {
  return (
    <li className="flex flex-col p-4 border rounded-lg bg-white shadow-md hover:shadow-lg transition-shadow font-sans">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-gray-900 truncate">
          {item.name}
        </h2>
        <p className="text-lg font-semibold text-gray-700">MYR {item.price}</p>
      </div>

      <div className="text-sm text-gray-600 mb-4 min-h-[1.5rem]">
        {item.description || (
          <span className="text-gray-400 italic">No description available</span>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {onClickEdit && (
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 rounded-lg shadow focus:ring-2 focus:ring-yellow-300 transition-colors"
            onClick={() => onClickEdit(item)}
          >
            Edit
          </button>
        )}
        {onDelete && (
          <button
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg shadow focus:ring-2 focus:ring-red-300 transition-colors"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}
