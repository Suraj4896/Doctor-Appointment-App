import React, { useState } from 'react'

const Login = () => {
  //state for sign up
  const [state, setState] = useState('Sign Up');
  //state for email
  const [email, setEmail] = useState('');
  //state for password
  const [password, setPassword] = useState('');
  //state for name
  const [name, setName] = useState('');

  //function to handle sign up
  const onSubmitHandler = async (event) =>{
    //prevent default form submission
      event.preventDefault();
  }
  return (
    // according to the state we will switch between sign up and login
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        {
          //show the name input field when state is sign up
          state === 'Sign Up' && (
            <div className='w-full'>
              <p>Full Name</p>
              <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setName(e.target.name)} value={name} required />
            </div>
          )
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setEmail(e.target.name)} value={email} required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setPassword(e.target.name)} value={password} required />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base shadow-lg'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === 'Sign Up'
           ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
           : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login