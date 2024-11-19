import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import gallery from './gallery.reducer';
import chosenPhoto from './chosenPhoto.reducer';
import profilePicture from './profilePicture.reducer';
import storybook from './storybook.reducer';
import pages from './pages.reducer';
import pageNum from './pageNum.reducer';
import profileCover from './profileCover.reducer';
import logo from './logo.reducer';
import libraryCategory from './libraryCategory.reducer';
import libraryGallery from './libraryGallery.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  gallery,
  chosenPhoto,
  storybook,
  profilePicture,
  pages,
  pageNum,
  profileCover,
  logo,
  libraryCategory,
  libraryGallery
});

export default rootReducer;
