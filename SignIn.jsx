import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Custom from './Custom';

function SignIn() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });
  const navigate = useNavigate();
  const location = useLocation();
 

  const handleInput = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

     axios.defaults.withCredentials = true;

     useEffect(()=>{
      axios.get('http://localhost:3001')
      .then(res=>{
        if(res.data.valid){
          navigate('/welcome')
        }else{
          navigate('/')
        }
         })
      .catch(err=>console.log(err))
    },[])
    


  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/login', values)
      .then((res) => {
        console.log("Login response:", res.data);
        if (res.data.Login) {
          navigate('/welcome');
        } else {
          showAlert('danger', "Password or Email is incorrect");
        }
      })
      .catch((err) => {
        console.error("Error during login:", err);
        showAlert('danger', 'An error occurred during login. Please try again.');
      });
  };


  
  const showAlert = (type, msg) => {
    setAlert({ show: true, type, msg });
    setTimeout(() => {
      setAlert({ show: false, type: '', msg: '' });
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
          Sign in to your account
        </h2>
      </div>

      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
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
              Login
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
