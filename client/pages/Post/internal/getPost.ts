import { getDataString } from "../../../../shared/graphql/getDataString";
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

  const data = getDataString(serverData, "getPost");
  if (data === undefined || data.id !== Number(id)) {
    // client side routing
    const [res] = useQuery({
      query: POST_QUERY,
      variables: { id },
    });

    return res.fetching ? initialState : res.data.getPost;
  }
  return data;
};
