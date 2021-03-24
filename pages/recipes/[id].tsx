/** @jsxImportSource @emotion/react */

import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';


import { getRecipeById } from "../../lib/recipe";

import { css } from '@emotion/react';

import { Head } from '../../component/head';
import { SearchBar } from '../../component/searchBar';
import { Steps } from "../../component/steps";
import { Ingredients } from "../../component/ingredients";

import type  { Recipe } from "../../lib/recipe";

const main = css`
  background-color: #FFF9E6;
`

const h1 = css`
  background-color: orange;
  text-align: center;
`
const img_alt_style = css`
  background-color: gray;
  max-width: 100%;
  height: 220px;
  position: relative;
`
const img_alt_text_style = css`
  position:absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 20pt;
  font-weight: 1000;
`

type Props = {
  recipe: Recipe
}

const RecipePage: NextPage<Props> = (props) => {
  const recipe = props.recipe;
  return (
    <div css={main}>
      <Head
        title={props.recipe.title + 'のレシピページ'}
        description={props.recipe.description}
        image={props.recipe.image_url}
      />
      <Link href="/"><h1 css={h1}>レシピサイト</h1></Link>
      <SearchBar />
      <hr />
      <h2>{ recipe?.title }</h2>
      {recipe?.image_url ? <img src={ recipe.image_url } className="img-fluid" alt="picture" /> : <div css={img_alt_style}><div css={img_alt_text_style}>NO IMAGE</div></div>}

      <p>作者：{ recipe?.author.user_name }</p>

      <p>概要：{ recipe?.description }</p>
      <Ingredients ingredients={recipe?.ingredients ?? []} />
      <Steps steps={recipe?.steps ?? []} />

      <hr />
      <p>最終更新：{ recipe?.published_at }</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = Number(context.query?.id);
  if(id === 0 || isNaN(id)) {
    return {
      notFound: true
    };
  }
  else {
    const recipe = await getRecipeById(id, process.env.API_KEY);
    return {
      props: {
        recipe: recipe
      }
    };
  }
}
export default RecipePage;