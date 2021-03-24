import { FC, useState } from "react";
import { useRouter } from 'next/router';


type Props = {
}


export const SearchBar: FC<Props> = (props) => {
    const router = useRouter();
    //検索ワードを入れるuseState
    const [searchWord, setSearchWord] = useState("");

    function handleClick() {
        if(searchWord === "") return;
        router.push(`/search?keyword=${searchWord}`)
    }

    return (
        <div id="searchBar">
            <div className="input-group">
                <button className="btn btn-outline-secondary" onClick={handleClick}>検索</button>
                <input type="text" className="form-control" value={searchWord} onChange={e => setSearchWord(e.target.value)} />
            </div>
        </div>
    )
};