import { useQuery } from "urql";
import { POSTS_QUERY } from "../../../../shared/graphql/query/posts";

const initialState = {
    current: 0,
    next: 0,
    preview: 0,
    category: '',
    results: [
        {
            id: 0,
            title: '',
            contents: '',
            category: '',
            pub_date: '',
        }
    ]
}

export const getPosts = (data, variables) => {
    let res = undefined
    if (!data.getPosts) {
        const [response] = useQuery({
            query: POSTS_QUERY,
            variables,
        });
        res = response;
    }

    if (data.getPosts) {
        if (
            variables.category !== data.getPosts.category ||
            variables.pages !== data.getPosts.current
        ) {
            return res.data === undefined ? initialState : res.data.getPosts;
        }
        return data.getPosts;
    }

    return res.data === undefined ?
        initialState :
        res.data.getPosts;
}