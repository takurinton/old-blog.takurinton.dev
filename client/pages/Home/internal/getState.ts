const initialState = {
    current: 0,
    next: 0,
    preview: 0,
    category: '',
    results: [
        {
            id: 0,
            title: '',
            contents: '',
            category: '',
            pub_date: '',
        }
    ]
}

export const getState = (data, d) => {
    return data.getPosts ?
        data.getPosts.results : d === undefined ?
            initialState.results :
            d.results
}