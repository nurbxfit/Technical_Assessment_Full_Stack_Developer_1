import { PropsWithChildren } from "react";
import { ItemType } from "shared";

type ItemCardComponentProps = PropsWithChildren & {
  item: ItemType & {
    id: string;
  };
};

export default function ItemCard({ item }: ItemCardComponentProps) {
  return (
    <li
      style={{
        listStyle: "none",
        borderStyle: "solid",
        borderColor: "whitesmoke",
        padding: "20px",
        margin: "10px",
      }}
      key={item.id}
    >
      <div>
        <h2>{item.name}</h2>
        <p> MYR {item.price}</p>
        <p>{item.description}</p>
      </div>
    </li>
  );
}
