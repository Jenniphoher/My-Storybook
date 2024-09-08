const imgUpdateReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_POSITION':
            return action.payload;
        case 'UNSET_GALLERY':
            return [];
        default:
            return state;
    }
};

export default imgUpdateReducer;