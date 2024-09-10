const imgUpdateReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_IMAGE_CHANGE':
            return action.payload;
        case 'SET_TEXT':
            return action.payload;
        case 'UNSET_IMAGE_CHANGE':
            return [];
        default:
            return state;
    }
};

export default imgUpdateReducer;