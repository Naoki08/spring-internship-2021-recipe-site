import { useRouter } from 'next/router'

import { getRecipesByKeyword, getNewRecipes, Recipe } from "../lib/recipe"
import { SearchBar } from '../component/searchBar'
import { RecipeLink } from '../component/recipeLink'

import type { Response } from "../lib/recipe";
import React, { useEffect, useState, FC } from "react";
import { resourceUsage } from 'node:process';
import Link from 'next/link';
import { GetServerSideProps, NextPage } from 'next';
import { RSA_NO_PADDING } from 'node:constants';

type Props = {
    response: Response
}

const TopPage: NextPage<Props> = (props) => {
    const recipes = props.response.recipes;
    let prev, next : string;
    if(props.response.links.prev !== undefined) prev = props.response.links.prev.split("=").pop();
    if(props.response.links.next !== undefined) next = props.response.links.next.split("=").pop();

    return (
        <div>
            <h1>TOP PAGE</h1>
            <SearchBar />
            {
                recipes.map((r, i) => (
                    <div key={i}><RecipeLink recipe={r} /></div>
                ))
            }
            {
                (() => {
                    if(prev !== undefined) return <Link
                    href = {{
                        pathname: '/',
                        query: {page: prev}
                    }}
                    >PREV</Link>
                })()
            }
            {
                (() => {
                    if(next !== undefined) return <Link
                    href = {{
                        pathname: '/',
                        query: {page: next}
                    }}
                    >NEXT</Link>
                })()
            }
        </div>
    )
};

// contextからパラメーターを受け取ってデータをサーバーサイドで取ってくる
export const getServerSideProps: GetServerSideProps = async (context) => {
    const page = Number(context.query?.page); //pageパラメーターを受け取る

    if(isNaN(page)) { //不正なパラメーターならデフォルトとして1を返す
        return {
            props: {
                response: await getNewRecipes(1, process.env.API_KEY)
            }
        }
    }
    else {
        return { //ページパラメーターが存在するなら対応したデータを返す
            props: {
                response: await getNewRecipes(page, process.env.API_KEY)
            }
        };
    }
}

export default TopPage;
