const pageNumReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PAGE_NUMBER':
            return action.payload;
        case 'UNSET_PAGE_NUMBER':
            return {};
        default:
            return state;
    }
};

export default pageNumReducer;