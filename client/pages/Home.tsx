import React, { useCallback, useEffect, useState } from "react";
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
    const [state, setState] = useState<Props>({ results: [] } as Props);
    const p = props.results ? props : state; // もう少しいい方法考える
    useEffect(() => {
        const data = JSON.parse(document.getElementById('json').getAttribute('data-json'));
        if (data.results === undefined) {
            fetch('https://api.takurinton.com/blog/v1/').then(res => res.json()).then(json => setState(json))
        } else {
            setState(data);
        }
    }, []);

    const handleMouseEnter = useCallback((id) => {
        fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
            .then(res => res.json())
            .then(json => document.getElementById('json').setAttribute('data-json', JSON.stringify(json)))
    }, []);


    return (
        <div>
            <h1>blog</h1>
            {
                p.results.map(p => (
                    <div key={p.id}>
                        <h2 onMouseEnter={() => handleMouseEnter(p.id)}><Link to={`/post/${p.id}`}>{p.title}</Link></h2>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
});
