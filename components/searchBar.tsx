/** @jsxImportSource @emotion/react */

import { FC, useState } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link';

import { css } from '@emotion/react';

const main = css`
    margin: 10px;
`
const h1 = css`
    background-color: orange;
    text-align: center;
`
type Props = {
}

// 検索バーコンポーネント
export const SearchBar: FC<Props> = (props) => {
    const router = useRouter();
    //検索ワードを入れるuseState
    const [searchWord, setSearchWord] = useState("");

    // 検索ワードをkeywordにして/searchにpush
    function handleClick() {
        if(searchWord === "") return;
        router.push(`/search?keyword=${searchWord}`)
    }

    return (
        <div>
            <Link href='/'><h1 css={h1}>レシピサイト</h1></Link>
            <div css={main}>
                <form onSubmit={e => {
                    handleClick();
                    e.preventDefault();
                }}>
                    <div className="input-group">
                        <button className="btn btn-primary" onClick={handleClick}>検索</button>
                        <input type="text" className="form-control" value={searchWord} onChange={e => setSearchWord(e.target.value)} />
                    </div>
                </form>
            </div>
        </div>
    )
};