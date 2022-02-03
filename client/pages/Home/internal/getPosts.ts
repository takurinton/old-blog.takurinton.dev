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
    const [res] = useQuery({
        query: POSTS_QUERY,
        variables,
    });

    if (data.getPosts) {
        if (
            variables.category !== data.getPosts.category
        ) {
            return res.data === undefined ? initialState.results : res.data.getPosts.results;
        }
        return data.getPosts.results;
    }

    return res.data === undefined ?
        initialState.results :
        res.data.getPosts.results;
}