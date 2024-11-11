const libraryCategoryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        case 'UNSET_CATEGORIES':
            return [];
        default:
            return state;
    }
};

export default libraryCategoryReducer;