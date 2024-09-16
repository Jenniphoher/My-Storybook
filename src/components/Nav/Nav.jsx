import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../Boiler/LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Nav() {
  const dispatch = useDispatch();
  const logo = useSelector(store => store.logo);
  const user = useSelector((store) => store.user);
  let url = 'https://res.cloudinary.com/dep5h4tka/image/upload/t_cropped logo/v1726471643/IMG_0075_qgy4p7.png'

  useEffect(() => {
    // dispatch({type: 'FETCH_LOGO'})
  }, [dispatch])

  // console.log('This is logo:', logo);

  return (
    <div className="nav tw-w-full tw-bg-black">

        

      <Link to="/home">
        <img className="logoImg" src={url} />
        <h2 className="nav-title">My</h2>
        <h2 className="nav-title2">Storybook</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            {/* <Link className="navLink" to="/user">
              Welcome
            </Link>
            <Link className="navLink" to="/home_page">
              Home
            </Link> */}
            <LogOutButton className="navLink tw-bg-black" />
          </>
        )}

      </div>
    </div>
  );
}

export default Nav;
