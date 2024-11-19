import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import ProtectedRoute from '../Boiler/ProtectedRoute/ProtectedRoute';
import Nav from '../Nav/Nav';
import Footer from '../Boiler/Footer/Footer';
import LoginPage from '../Boiler/LoginPage/LoginPage';
import RegisterPage from '../Boiler/RegisterPage/RegisterPage';
import HomePage from '../HomePage/HomePage';
import CreatePage from '../CreatePage/CreatePage';
import ProfilePage from '../ProfilePage/ProfilePage';
import ImagePage from '../ImagePage/ImagePage';
import StoryFullScreen from '../StoryFullScreen/StoryFullScreen';
import ProfileUserGallery from '../ProfilePage/ProfileUserGallery';
import LibraryPage from '../LibraryPage/LibraryPage';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div className='content'>
        <Nav />
        <Switch>

          <Redirect exact from="/" to="/home" />


          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:5173/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:5173/user */}



          <ProtectedRoute exact path="/home_page">
            <HomePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/create_page/:id/:page?">
            <CreatePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile_page/:id">
            <ProfilePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/image_page/:id/:page?">
            <ImagePage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/story_fullscreen/:id">
            <StoryFullScreen />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile_photo/:id">
            <ProfileUserGallery />
          </ProtectedRoute>

          <ProtectedRoute exact path="/profile_cover/:id">
            <ProfileUserGallery />
          </ProtectedRoute>

          <ProtectedRoute exact path="/library_page">
            <LibraryPage />
          </ProtectedRoute>





          <Route exact path="/login">
            {user.id ? 
              <Redirect to="/home_page" /> : <LoginPage />
            }
          </Route>
          <Route exact path="/registration">
            {user.id ?
              <Redirect to="/home_page" /> : <RegisterPage />
            }
          </Route>
          <Route exact path="/home">
            {user.id ?
              <Redirect to="/home_page" /> : <LoginPage />
            }
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
