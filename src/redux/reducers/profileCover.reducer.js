const profileCoverReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_COVER':
            return action.payload;
        case 'UNSET_PROFILE_COVER':
            return [];
        default:
            return state;
    }
};

export default profileCoverReducer;