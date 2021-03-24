import { FC } from "react";

type Props = {
    ingredients: {
        name: string; // 材料名
        quantity: string; // 分量（100g など）
    }[];
}

export const Ingredients: FC<Props> = (props) => {
    return (
        <div>
            <ul className="list-group">
                <div id="list-title">材料</div>
                {props.ingredients.map((ing, i) => (
                    <li className="list-group-item" key={i}>{ing.name} : {ing.quantity}</li>
                ))}
            </ul>
        </div>
    )
};