import { useQuery } from "../../../../shared/graphql/hooks";
import { POST_QUERY } from "../../../../shared/graphql/query/post";

const initialState = {
  id: 0,
  title: "",
  contents: "",
  category: "",
  pub_date: "2022-01-01",
};

export const getPost = ({ id, isServer, serverData }) => {
  if (isServer) {
    // @ts-ignore
    return JSON.parse(Object.values(serverData)[0].data).getPost;
  }

  const [res] = useQuery({
    query: POST_QUERY,
    variables: { id },
  });

  const { data, fetching } = res;
  if (!fetching) {
    if (data.getPost) {
      return data.getPost;
    }
  }
  return initialState;
};
