const initialState = {
    id: 0,
    title: '',
    contents: '',
    category: '',
    pub_date: '',
}

export const getState = (data, d, id) => {
    if (data.getPost) {
        if (data.getPost.id === Number(id)) {
            return data.getPost;
        }
    }
    if (d === undefined) {
        return initialState;
    }
    return d;
}