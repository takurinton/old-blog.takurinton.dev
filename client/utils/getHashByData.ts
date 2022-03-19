// 厳密には hash からとってるわけではない
export const getHashByData = (obj, isServer) => {
  try {
    if (!isServer) {
      // @ts-ignore
      return JSON.parse(Object.values(JSON.parse(obj))[0].data);
    }

    // @ts-ignore
    return JSON.parse(Object.values(obj)[0].data);
  } catch (err) {
    // GraphQL じゃない obj が来た時用
    // external -> home みたいなパターン
    return {};
  }
};
