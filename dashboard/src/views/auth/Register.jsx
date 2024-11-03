import React, { useState} from 'react'
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const Register = () => {
  const [state, setState] = useState({ name: "", email: "", password: "" });

  const inputHandle = (e) => {
    setState({ ...state, [e.target.name] : e.target.value });
  }

  const submit = (e) => {
    e.preventDefault();
  }

  return (
    <div className='min-w-screen min-h-screen bg-[#cdcae9] flex items-center justify-center'>
      <div className='w-[350px] text-[#ffffff] p-2'>
        <div className='bg-[#6f68d1] p-4 rounded-md'>
          <h2 className='text-xl mb-3 font-bold'>Welcome to Ecommerce</h2>
          <p className='text-sm mb-3 font-medium'>Please Register Your Account</p>

          <form onSubmit={submit}>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor="name" className='text-sm font-medium'>Name</label>
              <input onChange={inputHandle} value={state.name} type="text" id='name' className='px-3 py-2 outline-none border-slate-700 text-[#000000] bg-white rounded-md' placeholder='Name' required />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor="email" className='text-sm font-medium'>Email</label>
              <input onChange={inputHandle} value={state.email} type="email" id='email' className='px-3 py-2 outline-none border-slate-700 text-[#000000] bg-white rounded-md' placeholder='Email' required />
            </div>
            <div className='flex flex-col w-full gap-1 mb-3'>
              <label htmlFor="password" className='text-sm font-medium'>Password</label>
              <input onChange={inputHandle} value={state.password} type="password" id='password' className='px-3 py-2 outline-none border-slate-700 text-[#000000] bg-white rounded-md' placeholder='Password' required />
            </div>

            <div className='flex items-center w-full gap-3 mb-3'>
              <input type="checkbox" id='checkbox' name='checkbox' className='w-4 h-4 text-blue-600 overflow-hidden bg-gray-200 rounded-md border-gray-300 focus:ring-blue-500' />
              <label htmlFor="checkbox" className='text-sm font-medium'>I agree to the privacy policy & terms</label>
            </div>

            <button className='w-full bg-slate-800 hover:shadow-blue-300/50 hover:shadow-lg text-white px-5 py-2 mb-3 rounded-md'>Register</button>

            <div className='flex items-center mb-3 justify-center gap-3'>
              <p className=''>Already have an account?</p>
              <Link to='/login' className='font-bold'>Sign In</Link>
            </div>

            <div className='flex items-center justify-center mb-3 w-full'>
              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
              <div className='w-[10%] flex justify-center items-center'>
                <span className='pb-1'>Or</span>
              </div>

              <div className='w-[45%] bg-slate-700 h-[1px]'></div>
            </div>

            <div className='flex items-center justify-center gap-3'>
              <div className='w-[135px] h-[35px] flex rounded-md bg-orange-700 shadow-lg hover:shadow-lg hover:shadow-orange-700/50 justify-center items-center cursor-pointer overflow-hidden'>
                <span><FaGoogle /></span>
              </div>
              <div className='w-[135px] h-[35px] flex rounded-md bg-blue-700 shadow-lg hover:shadow-lg hover:shadow-blue-700/50 justify-center items-center cursor-pointer overflow-hidden'>
                <span><FaFacebook /></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;