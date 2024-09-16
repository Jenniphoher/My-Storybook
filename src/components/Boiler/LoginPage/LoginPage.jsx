import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useHistory } from 'react-router-dom';
import './LoginPage.css'

function LoginPage() {
  const history = useHistory();
  const url = ''

  return (
    <div className='loginPage'>

      <div className='loginScreenText'>
        <span className='srnText Tell'>Tell</span>
        <div className='yourStory'>
          <span className='srnText Your'>Your</span>
          <span className='srnText Story'>Story</span>
        </div>
      </div>

      <LoginForm />


    </div>
  );
}

export default LoginPage;
4