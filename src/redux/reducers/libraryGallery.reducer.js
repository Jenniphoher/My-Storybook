const libraryGalleryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_GALLERY':
            return action.payload;
        case 'UNSET_GALLERY':
            return [];
        default:
            return state;
    }
};

export default libraryGalleryReducer;