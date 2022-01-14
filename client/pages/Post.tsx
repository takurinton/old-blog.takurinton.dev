import React from "react";
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
    return (
        <div>
            <h1>{props.title}</h1>
        </div>
    )
});
