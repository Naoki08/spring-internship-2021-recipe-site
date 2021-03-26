/** @jsxImportSource @emotion/react */

import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { css } from '@emotion/react';

const main = css`
    background-color: #FFF9E6;
`

type Props = {}

class Document extends NextDocument<Props> {
    render() {
        return (
            <Html lang="ja">
                <Head />
                <body css={main}>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default Document