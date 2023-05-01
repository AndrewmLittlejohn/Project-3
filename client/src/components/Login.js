import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import AuthContext from '../utils/auth';

function Login(props) {
  const [email, validateEmail] = useState('');
  const [password, validatePassword] = useState('');
  const navigate = useNavigate();
 
  const {setLoggedIn, setEmail} = useContext(AuthContext);

  const [login] = useMutation(LOGIN);

  const acceptEmail = (e) => {
    validateEmail(e.target.value);
  };

  const acceptPassword = (e) => {
    validatePassword(e.target.value);
  };

  const validate =  async (e) => {
    e.preventDefault();
    
    if (email.trim() === '' || password.trim() === '') {
      alert('Please enter a valid email and the correct password');
    } else {
      try {
      const {data } = await login({
        variables: { email, password },
      });
      if (data.login) {
        console.log('Login data:', data.login);
        setLoggedIn(true);
        setEmail(email);
        localStorage.setItem('userEmail', email);
        console.log('User email:', email);
        navigate('/search');
      } else {
        alert('Please check your email and password.');
      }
      } catch (err) {
        console.error(err);
      }}
  };

  return (
    <div className="box">
      <div className="field">
        <h1 className="title is-4">Log in</h1>
        <form onSubmit={validate}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className="input" type="email" placeholder="Login email address" value={email} onChange={acceptEmail} />
            </div>
          </div>

          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className="input" type="password" placeholder="Password" value={password} onChange={acceptPassword} />
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link">Log in</button>
            </div>
            <div className="control">
              <Link to="/SignUp" className="button is-link">Sign Up</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
