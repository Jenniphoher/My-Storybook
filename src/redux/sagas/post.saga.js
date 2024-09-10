import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ============ CREATE POST && POSTS
function* createPost(action) {
    const userId = action.payload.user_id;
    try {
        // console.log('history for create post is:', action.payload);
        const response = yield axios.post('/api/post')
        // console.log('create post response data:', response.data);
        const postId = response.data.id
        // yield put({
        //     type: 'FETCH_CREATED_POST',
        //     payload: postId
        // })
        action.payload.history.push(`/create_page/${postId}`)
    } catch (error) {
        console.log('Error creating post', error)
    }
}

function* fetchCreatedPost(action) {
    const postId = action.payload.post_id;
    const getPhoto = action.payload.getPhoto;
    try {
        const response = yield axios.get(`/api/post/${postId}`)
        yield put({
            type: 'SET_POST',
            payload: response.data
        })
        getPhoto();
    } catch (error) {
        console.log('Error getting created post', error)
    }
}

function* fetchPosts(action) {
    try {
        const response = yield axios.get('api/post')
        yield put({
            type: 'SET_POST',
            payload: response.data
        })
    } catch (error) {
        
    }
}

function* deleteCreatedPost(action) {
    const postId = action.payload.post_id;
    try {
        yield axios.delete(`/api/post/${postId}`)
        yield put({
            type: 'FETCH_POSTS'
        })
        action.payload.history.push(`/home_page`)
    } catch (error) {
        
    }
}


// ============ PROFILE
function* fetchProfilePosts(action) {
    try {
        const response = yield axios.get(`api/post/profile/${action.payload}`)
        yield put({
            type: 'SET_POST',
            payload: response.data
        })
    } catch (error) {
        
    }
}

// ============ STORY FULLSCREEN
function* fetchStoryFullscreen(action) {
    try {
        const response = yield axios.get(`api/post/fullscreen/${action.payload}`)
        yield put({
            type: 'SET_POST',
            payload: response.data
        })
    } catch (error) {
        
    }
}

function* deleteStory(action) {
    const storyId = action.payload.story_id;
    const userId = action.payload.user_id;
    try {
        yield axios.delete(`/api/post/${storyId}`)
        yield put({
            type: 'FETCH_POSTS'
        })
        action.payload.history.push(`/profile_page/${userId}`)
    } catch (error) {
        
    }

}


function* postSaga() {
    yield takeLatest('CREATE_POST', createPost);
    yield takeLatest('FETCH_CREATED_POST', fetchCreatedPost);
    yield takeLatest('FETCH_POSTS', fetchPosts)
    yield takeLatest('FETCH_PROFILE_POSTS', fetchProfilePosts);
    yield takeLatest('FETCH_STORY_FULLSCREEN', fetchStoryFullscreen)
    yield takeLatest('DELETE_STORY', deleteStory)
    yield takeLatest('DELETE_CREATED_POST', deleteCreatedPost)
}

export default postSaga;