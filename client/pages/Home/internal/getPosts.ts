import { useQuery } from "urql";
import { POSTS_QUERY } from "../../../../shared/graphql/query/posts";

export const getPosts = (data) => {
    if (!data.getPosts) {
        const [res] = useQuery({
            query: POSTS_QUERY,
            variables: { page: 1, category: '' },
        });

        const { data, fetching } = res;
        if (!fetching) return data.getPosts;
    }
}