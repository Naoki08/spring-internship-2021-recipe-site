/** @jsxImportSource @emotion/react */

import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { css } from '@emotion/react';

import { getRecipesByKeyword } from "../lib/recipe";
import { Head } from '../component/head';
import { SearchBar } from '../component/searchBar';
import { RecipeLink } from '../component/recipeLink';

import type { Response } from "../lib/recipe";;


const main = css`
    background-color: #FFF9E6;
`

const h1 = css`
    background-color: orange;
    text-align: center;
`
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

const SearchPage: NextPage<Props> = (props) => {
    const recipes = props.response.recipes;
    let prev, next : string;
    if(props.response.links.prev !== undefined) prev = props.response.links.prev.split("=").pop();
    if(props.response.links.next !== undefined) next = props.response.links.next.split("=").pop();
    const router = useRouter();


    return (
        <div css={main}>
            <Head
                title={router.query.keyword + 'の検索結果'}
                description={router.query.keyword + 'の検索結果です'}
            />
            <Link href="/"><h1 css={h1}>レシピサイト</h1></Link>
            <SearchBar />
            <hr />
            <div css={tab_btn}>
                {
                    (() => {
                        if(prev !== undefined) return <Link
                        href = {{
                            pathname: '/search',
                            query: {keyword: router.query.keyword, page: prev}
                        }}
                        ><button className="btn btn-secondary" css={prev_style}>PREV</button></Link>
                        else return <button className="btn btn-outline-secondary disabled" css={prev_style}>PREV</button>
                    })()
                }
                {
                    (() => {
                        if(next !== undefined) return <Link
                        href = {{
                            pathname: '/search',
                            query: {keyword: router.query.keyword, page: next}
                        }}
                        ><button className="btn btn-secondary" css={next_style}>NEXT</button></Link>
                        else return <button className="btn btn-outline-secondary disabled" css={prev_style}>NEXT</button>
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
                            pathname: '/search',
                            query: {keyword: router.query.keyword, page: prev}
                        }}
                        ><button className="btn btn-secondary" css={prev_style}>PREV</button></Link>
                        else return <button className="btn btn-outline-secondary disabled" css={prev_style}>PREV</button>
                    })()
                }
                {
                    (() => {
                        if(next !== undefined) return <Link
                        href = {{
                            pathname: '/search',
                            query: {keyword: router.query.keyword, page: next}
                        }}
                        ><button className="btn btn-secondary" css={next_style}>NEXT</button></Link>
                        else return <button className="btn btn-outline-secondary disabled" css={prev_style}>NEXT</button>
                    })()
                }
            </div>
            </div>
    )
};

// contextからパラメーターを受け取ってデータをサーバーサイドで取ってくる
export const getServerSideProps: GetServerSideProps = async (context) => {
    const keyword = String(context.query?.keyword);
    const page = Number(context.query?.page); //pageパラメーターを受け取る

    if(keyword === undefined || keyword === null) {
        return {
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }

    if(isNaN(page)) { //不正なパラメーターならデフォルトとして1を返す
        return {
            props: {
                response: await getRecipesByKeyword(encodeURIComponent(keyword), 1, process.env.API_KEY)
            }
        }
    }
    else {
        return { //ページパラメーターが存在するなら対応したデータを返す
            props: {
                response: await getRecipesByKeyword(encodeURIComponent(keyword), page, process.env.API_KEY)
            }
        };
    }
}

export default SearchPage;
