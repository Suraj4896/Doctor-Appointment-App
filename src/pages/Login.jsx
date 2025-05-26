import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //logic for submit
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const endpoint = state === 'Sign Up' ? '/register' : '/login';
      const payload = state === 'Sign Up' ? { name, password, email } : { password, email };
      
      const { data } = await axios.post(backendUrl + '/api/user' + endpoint, payload);
      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token);
        toast.success(`Welcome ${state === 'Sign Up' ? name : 'back'}!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setIsLoading(false);
    }
  }

  //if token is present then show the home page
  useEffect(() => {
    if (token) navigate('/');
  }, [token])

  return (
    <div className="min-h-screen flex items-center p-4">
      <form onSubmit={onSubmitHandler} className="w-full max-w-md px-4 mx-auto">
        <div className="bg-white rounded-xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] ring-1 ring-gray-200 transition-all duration-300 hover:shadow-[0_8px_40px_rgb(0,0,0,0.15)] hover:ring-gray-300">
          <div className="flex flex-col space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {state === 'Sign Up' ? "Create Account" : "Welcome Back"}
              </h2>
              <p className="text-gray-500">
                {state === 'Sign Up' 
                  ? "Start your journey with us" 
                  : "Continue to book your appointment"}
              </p>
            </div>

            {state === 'Sign Up' && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors outline-none"
                  required
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors outline-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                state === 'Sign Up' ? "Create Account" : "Sign In"
              )}
            </button>

            <p className="text-center text-gray-600">
              {state === 'Sign Up' 
                ? "Already have an account? "
                : "Don't have an account? "}
              <button
                type="button"
                onClick={() => setState(prev => prev === 'Sign Up' ? 'Login' : 'Sign Up')}
                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                {state === 'Sign Up' ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Login