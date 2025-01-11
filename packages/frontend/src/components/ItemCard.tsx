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
    <li className="flex p-2 border-2 flex-col font-sans h-auto rounded-md bg-white">
      <div className="flex justify-between w-full flex-wrap">
        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
        <p className="text-lg font-semibold text-gray-950"> MYR {item.price}</p>
      </div>
      <div className="w-full flex-none text-sm font-medium text-gray-800">
        <p>{item.description}</p>
      </div>

      <div className="flex gap-2 justify-evenly my-2">
        {onDelete && typeof onDelete == "function" && (
          <button
            className="bg-red-700 px-2 py-1 w-[140px] rounded-lg text-white"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </button>
        )}
        {onClickEdit && typeof onClickEdit == "function" && (
          <button
            className="bg-yellow-500 px-2 py-1 w-[140px] rounded-lg text-white"
            onClick={() => onClickEdit(item)}
          >
            Edit
          </button>
        )}
      </div>
    </li>
  );
}
