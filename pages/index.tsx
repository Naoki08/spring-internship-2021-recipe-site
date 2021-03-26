/** @jsxImportSource @emotion/react */

import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';

import { css } from '@emotion/react';

import { getNewRecipes } from "../lib/recipe";

import { Head } from '../components/head';
import { RecipeLink } from '../components/recipeLink';

import type { Response } from "../lib/recipe";

const tab_btn = css`
    margin: 10px;
`
const prev_style = css`
`
const next_style = css`
    float: right;
`

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
            <Head
                title={'レシピサイト'}
                description={'インターンで制作したレシピサイトです'}
            />
            <hr />
            <div css={tab_btn}>
                {
                    (() => {
                        if(prev !== undefined) return <Link
                        href = {{
                            pathname: '/',
                            query: {page: prev}
                        }}
                        ><button className="btn btn-secondary" css={prev_style}>PREV</button></Link>
                            else return <button className="btn btn-secondary disabled" css={prev_style}>PREV</button>
                    })()
                }
                {
                    (() => {
                        if(next !== undefined) return <Link
                        href = {{
                            pathname: '/',
                            query: {page: next}
                        }}
                        ><button className="btn btn-secondary" css={next_style}>NEXT</button></Link>
                        else return <button className="btn btn-secondary disabled" css={prev_style}>NEXT</button>
                    })()
                }
            </div>
            {
                recipes.map((r, i) => (
                    <div key={i}><RecipeLink recipe={r} /></div>
                ))
            }
            <hr />
            <div css={tab_btn}>
                {
                    (() => {
                        if(prev !== undefined) return <Link
                        href = {{
                            pathname: '/',
                            query: {page: prev}
                        }}
                        ><button className="btn btn-secondary" css={prev_style}>PREV</button></Link>
                        else return <button className="btn btn-secondary disabled" css={prev_style}>PREV</button>
                    })()
                }
                {
                    (() => {
                        if(next !== undefined) return <Link
                        href = {{
                            pathname: '/',
                            query: {page: next}
                        }}
                        ><button className="btn btn-secondary" css={next_style}>NEXT</button></Link>
                        else return <button className="btn btn-secondary disabled" css={prev_style}>NEXT</button>
                    })()
                }
            </div>
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
