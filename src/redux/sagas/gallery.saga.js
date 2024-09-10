import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// ============ USER GALLERY
function* fetchGallery(action) {
    // console.log('payload:', action.payload);
    try {
        const response = yield axios.get('/api/gallery');
        yield put({ 
            type: 'SET_GALLERY', 
            payload: response.data });
    } catch (error) {
        console.log('Error getting gallery', error);
    }
}

function* addPhoto(action) {
    const file = action.payload.file
    const title = action.payload.title;
    try {
        const data = new FormData();
        data.append('file', file);
        data.append('title', title)
        // console.log('file is:', file);
        // console.log('title is:', title);
        // console.log('This is data:', data);
        yield axios.post('/api/upload', data);
        yield put({ type: 'FETCH_GALLERY' })
    } catch (error) {
        console.log("Error uploading photo:", error);
    }
}


// ============ CHOOSE PHOTO
function* fetchChosenPhoto(action) {
    // console.log('payload:', action.payload);
    try {
        const response = yield axios.get('/api/gallery');
        yield put({ 
            type: 'SET_GALLERY', 
            payload: response.data });
    } catch (error) {
        console.log('Error getting chosen photo', error);
    }
}

function* addChosenPhoto(action) {
    const imgId = action.payload.img_id;
    const postId = action.payload.post_id;
    try {
        // console.log('payload:', action.payload);
        yield axios.put(`/api/post/photo/${postId}`, {img_id: imgId})
        yield put({
            type: 'FETCH_CREATED_POST',
            payload: postId
        })
    } catch (error) {
        console.log('Error adding chosen photo', error);
    }
}


// ============ UPDATES ON IMG POSITION AND TEXT



// send updates on text to 'post'


function* gallerySaga() {
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('FETCH_CHOSEN_PHOTO', fetchChosenPhoto);
    yield takeLatest('ADD_CHOSEN_PHOTO', addChosenPhoto);
    yield takeLatest('ADD_PHOTO', addPhoto);
}

export default gallerySaga;
