const storybookReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STORYBOOK':
            return action.payload;
        case 'SET_STORYBOOKS':
            return action.payload;
        case 'SET_USER_STORYBOOKS':
            return action.payload;
        case 'UNSET_STORYBOOK':
            return [];
        default:
            return state;
    }
};

export default storybookReducer;