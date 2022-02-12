// 厳密には hash からとってるわけではない
export const getHashByData = (obj, isServer) => {
    let data;
    if (!isServer) {
        // @ts-ignore
        data = Object.values(JSON.parse(obj))[0].data
    }
    // @ts-ignore
    return isServer ? JSON.parse(Object.values(obj)[0].data) : JSON.parse(data);
}