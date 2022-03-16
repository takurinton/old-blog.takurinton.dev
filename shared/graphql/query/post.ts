import { gql } from "@takurinton/urql";

export const POST_QUERY = gql`
  query postQuery($id: Int) {
    getPost(id: $id) {
      id
      title
      contents
      pub_date
      category
    }
  }
`;
