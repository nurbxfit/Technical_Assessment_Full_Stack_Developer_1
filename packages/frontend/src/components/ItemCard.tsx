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
    <li className="p-2 bg-slate-400 m-2 w-1/4 rounded-sm text-white">
      <div>
        <h2 className="text-lg font-semibold">{item.name}</h2>
        <p> MYR {item.price}</p>
        <p>{item.description}</p>
      </div>
      {onDelete && typeof onDelete == "function" && (
        <button onClick={() => onDelete(item.id)}>Delete</button>
      )}
      {onClickEdit && typeof onClickEdit == "function" && (
        <button onClick={() => onClickEdit(item)}>Edit</button>
      )}
    </li>
  );
}
