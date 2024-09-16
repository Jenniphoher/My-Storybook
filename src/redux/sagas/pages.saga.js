import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


// ============= CREATE && FETCH PAGE =============
function* createNewPage(action) {
    const pageNum = Number(action.payload.pageNum) + 1
    const storybookId = action.payload.storybookId
    try {
        const response = yield axios.post(`/api/pages/${pageNum}`, action.payload)
        console.log('This is payload from NEW PAGE AFTER AXIOS:', action.payload);
        yield put({
            type: 'UPDATE_PAGE_ON_NEW_PAGE',
            payload: action.payload
        })
        
        // action.payload.history.push(`/create_page/${storybookId}/${newPage}`)
    } catch (error) {
        console.log('Error creating page', error)
    }
}

function* fetchPage(action) {
    console.log('payload in fetch:', action.payload); 
    const pageNum = action.payload.pageNum;
    const storybookId = action.payload.storybookId;
    const data = {params1: pageNum, params2: storybookId};

    try {
        const response = yield axios.get(`/api/pages/page`, {params: data})
        const result = response.data
        console.log('result from fetch page:', result);
        yield put({
            type: 'SET_PAGE',
            payload: result
        })
    } catch (error) {
        console.log('Error getting page', error)
    }
}


// ============= UPDATE PAGE =============
function* updatePage(action) {
    console.log('payload in update img:', action.payload);
    const storybookId = action.payload.storybookId
    try {
        const response = yield axios.put(`/api/storybook/img_text/${storybookId}`, action.payload)
        yield put({
            type: 'UPDATE_PAGE_CHANGE',
            payload: response.data
        })

        
    } catch (error) {
        console.log("Error updating page:", error);
    }
}

function* updateOnNewPage(action) {
    const storybookId = action.payload.storybookId
    const pageNum = action.payload.pageNum
    console.log('UPDATE SHOULD be:', action.payload);

    try {
        const response = yield axios.put(`/api/pages/on_new_page/${storybookId}`, action.payload)
        console.log('New page (1) data WHERE ITS SUPPOSED TO BE:', response.data);
        // add to newPage if it's 1
        const newPage = response.data.newPage

        yield put({
            type: 'SET_PAGE_NUMBER',
            payload: {
                storybookId: storybookId, 
                pageNum: newPage
            }
        })

        action.payload.history.push(`/create_page/${storybookId}/${newPage}`)
    } catch (error) {
        console.log("Error updating on create new page:", error);
    }
}



// ============= SAGA =============
function* pagesSaga() {
    yield takeLatest('CREATE_NEW_PAGE', createNewPage);
    yield takeLatest('FETCH_PAGE', fetchPage);
    yield takeLatest('UPDATE_PAGE', updatePage);
    yield takeLatest('UPDATE_PAGE_ON_NEW_PAGE', updateOnNewPage)
}

export default pagesSaga;