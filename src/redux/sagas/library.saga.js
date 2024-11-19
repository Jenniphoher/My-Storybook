import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



// ============= FETCH LIBRARY =============
function* fetchLibrary(action) {
    try {
        const response = yield axios.get('/api/library/')
        // console.log('This is library data:', response.data);
        const categories = response.data.categories;
        const gallery = response.data.gallery;

        yield put({
            type: 'SET_CATEGORIES',
            payload: categories
        })

        yield put({
            type: 'SET_GALLERY',
            payload: gallery
        })
    } catch (error) {
        console.log('Error getting library', error);
    }
}

function* fetchGalleryNextPhotos(action) {
    const photoId = action.payload;
    console.log('This is the gallery photo id:', photoId);

    try {
        const response = yield axios.get(`/api/library/galleryNextPhotos/${photoId}`)
        console.log('This is next photos from gallery data:', response.data);

        yield put({
            type: 'SET_GALLERY',
            payload: response.data
        })
    } catch (error) {
        console.log('Error getting next photos for gallery', error);
    }
    
}

function* fetchGalleryBackPhotos(action) {
    
}



// ============= SAGA =============
function* librarySaga() {
    yield takeLatest('FETCH_LIBRARY', fetchLibrary);
    yield takeLatest('FETCH_GALLERY_NEXT_PHOTOS', fetchGalleryNextPhotos);
    yield takeLatest('FETCH_GALLERY_BACK_PHOTOS', fetchGalleryBackPhotos);
}

export default librarySaga;



// function* fetchCategories(action) {
    //     try {
    //         const response = yield axios.get('/api/library/category')
    //         // console.log('This is categories data:', response.data);
    //         yield put({
    //             type: 'SET_CATEGORIES',
    //             payload: response.data
    //         })
    //     } catch (error) {
    //         console.log('Error getting categories', error);
    //     }
    // }
    
    // function* fetchGallery(action) {
    //     try {
    //         const response = yield axios.get('/api/library/gallery')
    //         console.log('This is gallery data:', response.data);
    //         yield put({
    //             type: 'SET_GALLERY',
    //             payload: response.data
    //         })
    //     } catch (error) {
    //         console.log('Error getting gallery', error);
    //     }
    // }