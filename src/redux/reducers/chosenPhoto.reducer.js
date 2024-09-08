const chosenPhotoReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHOSEN':
            return action.payload;
        case 'UNSET_CHOSEN':
            return [];
        default:
            return state;
    }
};

export default chosenPhotoReducer;