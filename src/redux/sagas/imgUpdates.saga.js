import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// // ============ CREATE POST && POSTS
// function* createPost(action) {
//     const userId = action.payload.user_id;
//     try {
//         console.log('history for create post is:', action.payload);
//         const response = yield axios.post('/api/post')
//         console.log('create post response data:', response.data);
//         const postId = response.data.id
//         // yield put({
//         //     type: 'FETCH_CREATED_POST',
//         //     payload: postId
//         // })
//         action.payload.history.push(`/create_page/${postId}`)
//     } catch (error) {
//         console.log('Error creating post', error)
//     }
// }

// function* fetchCreatedPost(action) {
//     try {
//         const response = yield axios.get(`/api/post/${action.payload}`)
//         yield put({
//             type: 'SET_POST',
//             payload: response.data
//         })
//     } catch (error) {
//         console.log('Error getting created post', error)
//     }
// }

// function* fetchPosts(action) {
//     try {
//         const response = yield axios.get('api/post')
//         yield put({
//             type: 'SET_POST',
//             payload: response.data
//         })
//     } catch (error) {
        
//     }
// }

// // ============ PROFILE
// function* fetchProfilePosts(action) {
//     try {
//         const response = yield axios.get(`api/post/profile/${action.payload}`)
//         yield put({
//             type: 'SET_POST',
//             payload: response.data
//         })
//     } catch (error) {
        
//     }
// }

// // ============ STORY FULLSCREEN
// function* deleteStory(action) {
//     const storyId = action.payload.story_id;
//     const userId = action.payload.user_id;
//     try {
//         yield axios.delete(`/api/post/${storyId}`)
//         yield put({
//             type: 'FETCH_POSTS'
//         })
//         action.payload.history.push(`/profile_page/${userId}`)
//     } catch (error) {
        
//     }

// }

// ============ UPDATES ON IMG POSITION AND TEXT

function* updateImagePosition(action) {
    try {
        
    } catch (error) {
        
    }
}

function* updateTextPosition(action) {
    try {
        
    } catch (error) {
        
    }
}




function* imgUpdatesSaga() {
yield takeLatest('UPDATE_IMAGE_POSITION', updateImagePosition)
yield takeLatest('UPDATE_TEXT_POSITION', updateTextPosition)
}

export default imgUpdatesSaga;