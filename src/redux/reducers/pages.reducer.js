const pagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PAGE':
            return action.payload;
        case 'SET_PAGES':
            return action.payload;
        case 'SET_GET_PHOTOS':
            return action.payload;
        case 'UPDATE_PAGE_CHANGE':
            return action.payload;
        case 'UNSET_PAGE':
            return [];
        default:
            return state;
    }
};

export default pagesReducer;