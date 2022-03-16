import { useQuery } from "../../../../shared/graphql/hooks";
import { POST_QUERY } from "../../../../shared/graphql/query/post";

export const getPost = (data, id) => {
  const _data = data.getPost;
  if (!_data) {
    // client side routing
    const [res] = useQuery({
      query: POST_QUERY,
      variables: { id },
    });
    const { data, fetching } = res;
    if (!fetching) return data.getPost;
  } else if (_data.id !== Number(id)) {
    // rerender
    const [res] = useQuery({
      query: POST_QUERY,
      variables: { id },
    });
    const { data, fetching } = res;
    if (!fetching) return data.getPost;
  }
};
