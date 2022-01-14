import React, { useCallback } from "react";
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
    const handleMouseEnter = useCallback((id) => {
        fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
            .then(res => res.json())
            .then(json => document.getElementById('json').setAttribute('data-json', JSON.stringify(json)))
    }, []);

    return (
        <div>
            <h1>blog</h1>
            {
                props.results.map(p => (
                    <div key={p.id}>
                        <h2 onMouseEnter={() => handleMouseEnter(p.id)}><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
});
