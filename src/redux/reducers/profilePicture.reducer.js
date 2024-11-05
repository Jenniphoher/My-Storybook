const profilePictureReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILE_PICTURE':
            return action.payload;
        case 'UNSET_PROFILE_PICTURE':
            return [];
        default:
            return state;
    }
};

export default profilePictureReducer;