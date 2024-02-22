import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const resetForm = () => {
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setErrors({
            name: '',
            email: '',
            phone: '',
            password: '',
        });
        setShowerr('');
    };
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...errors };

        // Validate Name
        if (!name.trim()) {
            newErrors.name = 'Name is required';
            valid = false;
        } else {
            newErrors.name = '';
        }

        // Validate Phone
        if (!phone.trim()) {
            newErrors.phone = 'Phone number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(phone)) {
            newErrors.phone = 'Phone number must have 10 digits';
            valid = false;
        } else {
            newErrors.phone = '';
        }

        // Validate Email
        if (!email.trim()) {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Invalid email format';
            valid = false;
        } else {
            newErrors.email = '';
        }

        // Validate Password
        if (!password.trim()) {
            newErrors.password = 'Password is required';
            valid = false;
        } else {
            newErrors.password = '';
        }

        setErrors(newErrors);
        return valid;
    };
    const navigate = useNavigate();

    const register = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role,

            }),
        });

        const json = await response.json();

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg);
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    return (
        <div className="container" style={{marginTop:'5%'}}>
        <div className="signup-grid">
        <div className="signup-form">
         <form method="POST" onSubmit={register}>
         <div className="signup-text">
         <h1>Sign Up</h1>
         </div>
         <div className="signup-text">
            Already a member? <span><Link to="/Login" style={{ color: '#2190FF' }}> Login</Link></span>
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                id="role"
                className="form-control"
                required
            >
                <option value="" disabled hidden>Select Role</option>
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
            </select>
            </div>

          
           <div className="form-group">
                <label htmlFor="name">Name</label>
                <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
           </div>
           <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
           </div>
           <div className="form-group">
                <label htmlFor="email">Email</label>
                 <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                 {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
            </div>
            <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
              </div>
              <div className="btn-group">
                <button type="submit" className="btn btn-danger mb-2 mr-1 waves-effect waves-light" onClick={resetForm}>Reset</button>
              </div>
            {errors.name && <div className="err" style={{ color: 'red' }}>{errors.name}</div>}
            {errors.phone && <div className="err" style={{ color: 'red' }}>{errors.phone}</div>}
            {errors.email && <div className="err" style={{ color: 'red' }}>{errors.email}</div>}
            {errors.password && <div className="err" style={{ color: 'red' }}>{errors.password}</div>}
         </form>
         </div>
         </div>
         </div>
 //Sign up role is not stored in database. You can apply logic for this according to your react code.
    );
}

export default Sign_Up;