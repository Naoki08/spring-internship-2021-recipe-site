import { FC } from "react";

type Props = {
    steps: string[];
}

export const Steps: FC<Props> = (props) => {

    //順序が空の場合があるので詰める
    for(let i = 0; i < props.steps.length; i++) {
        if(props.steps[i] === "") {
            props.steps.splice(i, props.steps.length)
        }
    }
    return (
        <ol className="list-group">
            <div id="list-title">作り方</div>
            {props.steps.map((step, i) => (
                <li className="list-group-item" key={i}>{step}</li>
            ))}
        </ol>
    )
};