import React, { useEffect, useState } from "react";
import { Layout } from "../Layout";

// type Props = {
//     current: number;
//     next: number;
//     previous: number;
//     category: string;
//     results: Post[];
// };

type Props = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

export const Post: React.FC<{ props: Props }> = Layout(({ props }) => {
    const [state, setState] = useState<Props>({} as Props);
    useEffect(() => {
        const data = JSON.parse(document.getElementById('json').getAttribute('data-json'));
        setState(data);
    }, []);

    return (
        <div>
            <h1>{state.title}</h1>
        </div>
    )
});
