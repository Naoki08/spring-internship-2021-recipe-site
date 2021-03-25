/** @jsxImportSource @emotion/react */

import { FC } from "react";
import Link from 'next/link';

import { css } from '@emotion/react';

import type { Recipe } from "../lib/recipe";

const main = css`
    max-width: 100%;
    border: 5px rgb(235, 126, 126);
    height: 150px;
    margin: 10px;
`
const btn = css`
    width: 100%;
    height: 100%;
    background-color: rgb(255, 177, 132);
`
const img_style = css`
    width: 120px;
    height: 120px;
    margin: 6px;
    border: 2px solid #000000;
`
const alt_box_style = css`
    position: relative;
    width: 120px;
    height: 120px;
    margin: 6px;
    background-color: gray;
    border: 2px solid #000000;
`
const alt_text_style = css`
    position: absolute;
    font-size: 10pt;
    font-weight: 1000;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
`
const flex = css`
    display: flex;
`
const title = css`
    text-align: left;
    font-size: 11pt;
    font-weight: bold;
    margin: 5px;
`
const description = css`
    text-align: left;
    font-size: 9pt;
    margin: 5px;
`

type Props = {
    recipe: Recipe
}

export const RecipeLink: FC<Props> = (props) => {
    return (
        <div css={main}>
            <Link href="/recipes/[id]" as={`/recipes/${props.recipe.id}`}>
                <button css={btn}>
                <div css={flex}>
                    {
                        (() => {
                            if(props.recipe?.image_url) return <img src={ props.recipe.image_url } css={img_style} alt="picture" />
                            else return <div css={alt_box_style}><div css={alt_text_style}>NO IMAGE</div></div>
                        })()
                    }
                    <div>
                        <p css={title}>{ props.recipe.title }</p>
                        <p css={description}>{ props.recipe.description }</p>
                    </div>
                </div>
                </button>
            </Link>
        </div>
    )
}