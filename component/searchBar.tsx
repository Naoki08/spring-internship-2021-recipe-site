/** @jsxImportSource @emotion/react */

import { FC, useState } from "react";
import { useRouter } from 'next/router';

import { css } from '@emotion/react';

const main = css`
    margin: 5px;
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
        <div css={main}>
            <div className="input-group">
                <button className="btn btn-primary" onClick={handleClick}>検索</button>
                <input type="text" className="form-control" value={searchWord} onChange={e => setSearchWord(e.target.value)} />
            </div>
        </div>
    )
};