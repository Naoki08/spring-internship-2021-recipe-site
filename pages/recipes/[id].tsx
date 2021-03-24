import { GetServerSideProps, NextPage } from 'next';

import type  { Recipe } from "../../lib/recipe";
import { getRecipeById } from "../../lib/recipe";
import { Steps } from "../../component/steps"
import { Ingredients } from "../../component/ingredients"
import { SearchBar } from '../../component/searchBar'
import Link from 'next/link';

type Props = {
  recipe: Recipe
}

const RecipePage: NextPage<Props> = (props) => {
  const recipe = props.recipe;

  return (
    <div>
      <Link href="/"><div className="TopBar">レシピサイト</div></Link>
      <SearchBar />
      <h1>レシピページ</h1>
      {recipe?.image_url ? <img src={ recipe.image_url } className="img-fluid" alt="picture" /> : <div id="pic-alt"><p id="pic-alt-text">NO IMAGE</p></div>}
      <h2>{ recipe?.title }</h2>
      <p>作者：{ recipe?.author.user_name }</p>

      <p>{ recipe?.description }</p>
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