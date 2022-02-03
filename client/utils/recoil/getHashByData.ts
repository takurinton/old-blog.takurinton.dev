// 厳密には hash からとってるわけではない
export const getHashByData = (obj) => {
    // @ts-ignore
    return JSON.parse(Object.values(obj)[0].data);
}