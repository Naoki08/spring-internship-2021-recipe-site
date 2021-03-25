import { env } from "node:process";
import { RecipeLink } from "../components/recipeLink";

export type Recipe = {
    id: number; // レシピID
    title: string; // レシピ名
    description: string; // レシピ概要
    image_url: string | null; // レシピ画像。画像がない場合は null。
    author: {
      user_name: string; // レシピ作者
    };
    published_at: string; // レシピを公開した日時。ISO 8601
    steps: string[]; // レシピの手順
    // レシピの材料
    ingredients: {
      name: string; // 材料名
      quantity: string; // 分量（100g など）
    }[];
    // 関連するレシピのIDが最大5つ入っている。Poster View などを実装するのに使う。
    // なお、関連レシピの算出アルゴリズムのできが悪いため関連性が低い可能性がある点に注意。
    related_recipes: number[];
};
export type link = {
  next?: string;
  prev?: string;
}
export type Response = {
  recipes: Recipe[];
  links: link;
}

export async function getNewRecipes(page_num: number,  api_key: string): Promise<Response> {
  let url = `https://internship-recipe-api.ckpd.co/recipes?page=${page_num}`;
  const response = await fetch(
    url,
    {headers: {"x-api-key" : api_key}}
  );
  if(!response.ok) {
    const dammy : Response = {
      recipes: [] as Recipe[],
      links: {} as link,
    }
    return dammy;
  }
  const recipe = await response.json();
  return recipe as Response;
}

//検索ワードからレシピを検索
export async function getRecipesByKeyword(keyword: string, page_num: number, api_key: string): Promise<Response> {
    let url = `https://internship-recipe-api.ckpd.co/search?keyword=${keyword}&page=${page_num}`;
    const response = await fetch(
      url,
      {headers: {"x-api-key" : api_key}}
    );
    if(!response.ok) {
      const dammy : Response = {
        recipes: [] as Recipe[],
        links: {} as link,
      }
      return dammy;
    }
    const recipe = await response.json();
    return recipe as Response;
}

export async function getRecipeById(id: number, api_key: string): Promise<Recipe> {
  const url = `https://internship-recipe-api.ckpd.co/recipes/${id}`;
  const response = await fetch(
    url,
    {headers: {"x-api-key" : api_key}}
  )
  const recipe = await response.json();
  return recipe as Recipe;

}