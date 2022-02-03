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

    return data.getPosts ?
        data.getPosts.results : res.data === undefined ?
            initialState.results :
            res.data.getPosts.results
}