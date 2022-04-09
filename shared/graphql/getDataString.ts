type QueryName = "getPosts" | "getPost";

export const getDataString = (
  serverData: string,
  name: QueryName
): any | undefined => {
  // @ts-ignore
  const data = Object.values(JSON.parse(serverData))[0].data;

  // GraphQL のリクエストではない時
  if (data === undefined) {
    return undefined;
  }

  // GraphQL のリクエストの時
  const gqlData = JSON.parse(data)[name];
  // 期待してる name だったら普通に返す、違ったら undefined
  return gqlData || undefined;
};
