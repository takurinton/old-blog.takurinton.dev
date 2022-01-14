import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "../Layout";

type Props = {
    current: number;
    next: number;
    previous: number;
    category: string;
    results: Post[];
};

type Post = {
    __typename: string;
    id: number;
    title: string;
    contents: string;
    category: string;
    pub_date: string;
};

export const Home: React.FC<{ props: Props }> = Layout(({ props }) => {
    return (
        <div>
            <h1>blog</h1>
            {
                props.results.map(p => (
                    <div key={p.id}>
                        <h2><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
});
