import { PropsWithChildren } from "react";
import { ItemType } from "shared";

type ItemCardComponentProps = PropsWithChildren & {
  item: ItemType & {
    id: number;
  };
  onDelete?: (id: number) => void;
};

export default function ItemCard({ item, onDelete }: ItemCardComponentProps) {
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
    </li>
  );
}
