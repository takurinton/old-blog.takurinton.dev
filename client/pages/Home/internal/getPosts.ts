import { useQuery } from "../../../../shared/graphql/hooks";
import { POSTS_QUERY } from "../../../../shared/graphql/query/posts";
import { getDataString } from "../../../../shared/graphql/getDataString";

const initialState = {
  current: 0,
  next: 0,
  preview: 0,
  category: "",
  results: [
    {
      id: 0,
      title: "",
      contents: "",
      category: "",
      pub_date: "",
    },
  ],
};

export const getPosts = ({ variables, isServer, serverData }) => {
  if (isServer) {
    // @ts-ignore
    return JSON.parse(Object.values(serverData)[0].data).getPosts;
  }

  const [res] = useQuery({
    query: POSTS_QUERY,
    variables,
  });

  const data = getDataString(serverData, "getPosts");
  if (data !== undefined) {
    if (
      variables.category !== data.category ||
      Number(variables.pages) !== data.current
    ) {
      return res.data === undefined ? initialState : res.data.getPosts;
    }
    return data;
  }

  return res.data === undefined ? initialState : res.data.getPosts;
};
