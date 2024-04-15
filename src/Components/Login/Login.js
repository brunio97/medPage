
import React, { useState, useEffect } from 'react';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';
import { GetBannerMargin } from "../functions";
const Login = () => {
  const banM = GetBannerMargin();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/")
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();

// Validate email and password before making the API call
      if (!email.trim()) {
          alert('Email is required');
          return;
      }
      if (!password.trim()) {
        alert('Password is required');
        return;
      }

    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name: name,
        email:email,
        password: password,
      }),
    });

    const json = await res.json();
    if (json.authtoken) {
      sessionStorage.setItem('auth-token', json.authtoken);
  
      sessionStorage.setItem('email', email);

      navigate('/');
      window.location.reload()
    } else {
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container" style={{marginTop:banM}}>
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member? <span><Link to="/signup" style={{ color: '#2190FF' }}> Sign Up Here</Link></span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login}>
              <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
              </div>
              <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          name="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter your password"
                          aria-describedby="helpId"/>
              </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
