import { gql } from "@takurinton/urql";

export const POSTS_QUERY = gql`
query postsQuery($pages: Int, $category: String) {
    getPosts(page: $pages, category: $category) {
    current
    next
    previous
    category
    results {
        id
        title
        contents
        category
        pub_date
    }
    }
}
`;