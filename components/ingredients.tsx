/** @jsxImportSource @emotion/react */

import { FC } from "react";

import { css } from '@emotion/react';

const list_title = css`
    background-color: rgb(255, 239, 239);
`

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
                <div css={list_title}>材料</div>
                {props.ingredients.map((ing, i) => (
                    <li className="list-group-item" key={i}>{ing.name} : {ing.quantity}</li>
                ))}
            </ul>
        </div>
    )
};