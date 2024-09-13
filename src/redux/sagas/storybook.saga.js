import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



// ============= CREATE && FETCH STORYBOOK =============
// ------- done fixing
function* createStorybook(action) {
    try {
        const response = yield axios.post(`/api/storybook/`)
        console.log('Data from create storybook:', response.data);
        const storybookId = response.data.storybookId;
        const pageId = response.data.pageId;
        const pageNum = response.data.pageNum;

        yield put({
            type: 'SET_PAGE_NUMBER',
            payload: {
                storybookId: storybookId, 
                pageNum: pageNum
            }
        })

        action.payload.history.push(`/create_page/${storybookId}/${pageNum}`)
    } catch (error) {
        console.log('Error creating story', error)
    }
}

function* fetchAllStories(action) {
    const getPhoto = action.payload
    try {
        const response = yield axios.get('api/storybook')
        yield put({
            type: 'SET_STORYBOOKS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error getting stories', error)
    }
}

// ------- done fixing
function* deleteCreatedStorybook(action) {
    const storybookId = action.payload.storybookId;
    try {
        yield axios.delete(`/api/storybook/${storybookId}`)
        yield put({
            type: 'UNSET_STORYBOOK'
        })
        action.payload.history.push(`/home_page`)
    } catch (error) {
        console.log('Error deleting created story', error)
    }
}



// ============= PROFILE =============
// ------- done fixing
function* fetchProfileStories(action) {
    try {
        const response = yield axios.get(`api/storybook/profile/${action.payload}`)
        yield put({
            type: 'SET_USER_STORYBOOKS',
            payload: response.data
        })
    } catch (error) {
        console.log('Error getting profile stories', error)
    }
}



// ============= FULLSCREEN =============
function* fetchStoryFullscreen(action) {
    const storybookId = action.payload.storybookId;
    const getPhoto = action.payload.getPhoto
    try {
        const response = yield axios.get(`api/storybook/fullscreen/${storybookId}`)
        yield put({
            type: 'SET_STORYBOOK',
            payload: response.data
        })
        getPhoto()
    } catch (error) {
        console.log('Error getting fullscreen story', error)
    }
}

function* deleteStory(action) {
    const storyId = action.payload.story_id;
    const userId = action.payload.user_id;
    try {
        yield axios.delete(`/api/storybook/${storyId}`)

        action.payload.history.push(`/profile_page/${userId}`)
    } catch (error) {
        console.log('Error deleting story', error)
    }

}



// ============= SAGA =============
function* storybookSaga() {
    yield takeLatest('CREATE_STORYBOOK', createStorybook);
    yield takeLatest('FETCH_ALL_STORIES', fetchAllStories)
    yield takeLatest('FETCH_PROFILE_STORIES', fetchProfileStories);
    yield takeLatest('FETCH_STORY_FULLSCREEN', fetchStoryFullscreen)
    yield takeLatest('DELETE_STORY', deleteStory)
    yield takeLatest('DELETE_CREATED_STORYBOOK', deleteCreatedStorybook)
        // yield takeLatest('FETCH_CREATED_STORYBOOK', fetchCreatedStorybook);
}

export default storybookSaga;

// function* fetchCreatedStorybook(action) {
//     const storybookId = action.payload.storybookId;
//     const getPhoto = action.payload.getPhoto;
//     const fetchPage = action.payload.fetchPage;
//     try {
//         const response = yield axios.get(`/api/storybook/${storybookId}`)
//         console.log('fetch created storybook:', response.data);
//         yield put({
//             type: 'SET_STORYBOOK',
//             payload: response.data
//         })
//         // yield put({
//         //     type: 'FETCH_PAGE',
//         //     payload: 
//         // })
//         // fetchPage();
//         // getPhoto();
//     } catch (error) {
//         console.log('Error getting created story', error)
//     }
// }