import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import '../LoginPage/LoginPage.css'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>

      <h2 className='loginTitle'>Login</h2>

      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}

      <div className='inputWrapper'>
      <div className='usernameDiv'>

        <FormControl sx={{ m: 1, width: '15ch' }} variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Username</InputLabel>
          <Input
            id="input-with-icon-adornment"
            label="Username" 
            variant="standard"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)} 
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
          />
        </FormControl>
      </div>

      <div className='pwDiv'>
        <FormControl sx={{ m: 1, width: '15ch' }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        
      </div>
      <div className='btnDiv'>
        <input className="btn" type="submit" name="submit" value="Log In" />
      </div>

      <div className='registerDiv'>
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
      </div>

      </div>
    </form>
  );
}

export default LoginForm;
