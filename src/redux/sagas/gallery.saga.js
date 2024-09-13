import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// ============= CREATE && FETCH GALLERY =============
// ------- done fixing
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



// ============= UPLOAD =============
// ------- done fixing
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



// ============= CHOSEN PHOTO =============
// ------- WTF IS THIS? Why is this here???
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

// ------- done fixing
function* addChosenPhoto(action) {
    const imgId = action.payload.imgId;
    const pageNum = action.payload.pageNum;
    const storybookId = action.payload.storybookId;
    try {
        yield axios.put(`/api/storybook/photo/${pageNum}`, {imgId: imgId, storybookId: storybookId})
        
        yield put({
            type: 'FETCH_PAGE',
            payload: {
                storybookId: storybookId, 
                pageNum: pageNum
            }
        })

    } catch (error) {
        console.log('Error adding chosen photo', error);
    }
}



// ============= PROFILE PICTURE && COVER =============
// ------- done fixing
function* fetchProfilePicture(action) {
    const userId = action.payload
    try {
        const response = yield axios.get(`/api/gallery/profile_picture/${userId}`)
        // console.log('data from profile:', response.data);
        yield put({
            type: 'SET_PROFILE_PICTURE',
            payload: response.data
        })
    } catch (error) {
        console.log('Error getting profile picture', error);
    }
}

function* fetchProfileCover(action) {
    const userId = action.payload
    try {
        const response = yield axios.get(`/api/gallery/cover_photo/${userId}`)
        yield put({
            type: 'SET_PROFILE_COVER',
            payload: response.data
        })
    } catch (error) {
        console.log('Error getting profile picture', error);
    }
}

// ------- done fixing
function* addProfilePicture(action) {
    const userId = action.payload.useuserIdr_id
    // console.log('This is profile photo payload:', action.payload);
    try {
        yield axios.put(`/api/gallery/profile_picture/${userId}`, action.payload)
    } catch (error) {
        console.log('Error adding profile picture', error);
    }
    
}

function* addProfileCover(action) {
    const userId = action.payload.userId
    console.log('This is profile cover payload:', action.payload);
    try {
        yield axios.put(`/api/gallery/cover_photo/${userId}`, action.payload)
        action.payload.history.push(`/profile_page/${userId}`)
    } catch (error) {
        console.log('Error adding profile cover', error);
    }
    
}

// ============= SAGA =============
function* gallerySaga() {
    yield takeLatest('FETCH_GALLERY', fetchGallery);
    yield takeLatest('FETCH_CHOSEN_PHOTO', fetchChosenPhoto);
    yield takeLatest('FETCH_PROFILE_PICTURE', fetchProfilePicture)
    yield takeLatest('FETCH_PROFILE_COVER', fetchProfileCover)
    yield takeLatest('ADD_CHOSEN_PHOTO', addChosenPhoto);
    yield takeLatest('ADD_PHOTO', addPhoto);
    yield takeLatest('ADD_PROFILE_PICTURE', addProfilePicture)
    yield takeLatest('ADD_PROFILE_COVER', addProfileCover)
    
}

export default gallerySaga;
