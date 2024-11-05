const logoReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOGO':
            return action.payload;
        case 'UNSET_LOGO':
            return {};
        default:
            return state;
    }
};

export default logoReducer;