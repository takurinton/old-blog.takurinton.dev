import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Layout } from "../../Layout";

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

    const { id } = useParams();
    const isServerSideRenderingComponent = props.id !== undefined && props.id === Number(id);
    const p = isServerSideRenderingComponent ? props : state;
    useEffect(() => {
        if (!isServerSideRenderingComponent) {
            fetch(`https://api.takurinton.com/blog/v1/post/${id}`)
                .then(res => res.json())
                .then(data => setState(data));
        } else {
            const data = JSON.parse(document.getElementById('json').getAttribute('data-json'));
            setState(data);
        }
    }, []);

    return (
        <div>
            <h1>{p.title}</h1>
        </div>
    )
});
