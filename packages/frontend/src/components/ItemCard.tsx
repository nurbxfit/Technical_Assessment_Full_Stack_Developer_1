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
    <li
      style={{
        listStyle: "none",
        borderStyle: "solid",
        borderColor: "whitesmoke",
        padding: "20px",
        margin: "10px",
      }}
    >
      <div>
        <h2>{item.name}</h2>
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
