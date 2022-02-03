import { gql } from "@urql/core";

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