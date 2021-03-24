import { FC } from "react";
import HEAD from 'next/head';

type Props = {
    title: string;
    description: string;
    image?: string;
}

export const Head : FC<Props> = (props) => {
    return (
        <HEAD>
            <title>{props.title}</title>
            <meta property="og:title" content={props.title} />
            <meta property="og:description" content={props.description} />
            <meta property="og:type" content="blog" />
            <meta property="og:image" content={props.image} />
            <meta property="og:site_name" content={props.title} />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@tcr_jp" />
            <meta name="twitter:url" content={props.image} />
            <meta name="twitter:title" content={props.title} />
            <meta name="twitter:description" content={props.description} />
            <meta name="twitter:image" content={props.image} />
        </HEAD>
    );
};