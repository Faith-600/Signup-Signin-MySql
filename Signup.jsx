import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Custom from './Custom'

function Signup() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const navigate = useNavigate();

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z]{2,50}$/; // Regex for alphabetic characters and length 2-50
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!namePattern.test(values.name)) {
    showAlert('danger', 'Name must be 2-50 alphabetic characters long.');
    return; 
  }
  if(!passwordPattern.test(values.password)){
    showAlert('danger','Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.')
  return
  }

    try {
      const res = await axios.post('http://localhost:3001/users', values);
      console.log(res);
      navigate('/');
    } catch (err) {
      console.log(err.response);
      
      if (err.response.data.message === "Email already in use") {
        // Show custom alert for duplicate email
        showAlert('danger', 'This email is already registered. Please use a different email.');
      } else {  // console.error("Error during registration:", err);
        showAlert('danger', 'An error occurred during registration. Please try again.');
      }
    }
  };

  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
    setTimeout(() => {
      setAlert({ show: false, msg: '', type: '' });
    }, 3000);
  };
  const removeAlert = () => {
    setAlert({ show: false, type: '', msg: '' });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
   {alert.show && <Custom type={alert.type} msg={alert.msg} removeAlert={removeAlert} />} 
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign Up
        </h2>
      </div>

      {/* {alert.show && (
        <div className={`alert alert-${alert.type} text-center mt-4`}>
          {alert.msg}
        </div>
      )} */}

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="name"
                type="text"
                required
                autoComplete="off"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleInput}
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleInput}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleInput}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/">
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">Sign In</span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
