import { FC } from "react";
import Link from "next/link";

type Props = {
    related_recipes: number[];
}

export const RelatedRecipes: FC<Props> = (props) => {
    return (
        <ul>
            {props.related_recipes.map((rel, i) => (
                <li key={i}><Link href="/recipes/[id]" as={`/recipes/${rel}`}><a>{ rel }</a></Link></li>
            ))}
        </ul>
    )
};