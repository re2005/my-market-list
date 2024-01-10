'use client'

import {useState} from "react";
import {signUp} from "@/firebase/auth";
import IconLoading from '@/assets/loading-circle.svg'

export default function UiSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleForm = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    const {error}: any = await signUp(email, password)
    if (error) {
      setErrors(error.code.replace(/auth\//, '').replace(/-/g, ' '))
    }
    setLoading(false)
  }

  return (
    <div className='min-w-[300px]'>
      <p className='text-center text-2xl'>
        Create list
      </p>
      <form onSubmit={handleForm} className='flex flex-col gap-4 mt-6'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="email" className=''>
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} required type='email' name="email" id="email"
                   placeholder="my-email@gmail.com" className='text-black border p-3 rounded w-full'/>
          </label>
          <label htmlFor="new-password" className=''>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password"
                   id="new-password" placeholder="password" className='text-black border p-3 rounded w-full'/>
          </label>
        </div>
        <button type="submit" className='green-gradient-bg rounded p-2 text-white font-bold flex justify-center'>
          {loading ? <IconLoading className='w-6'/> : 'Sign up'}
        </button>
      </form>
      <div className='mt-6 w-full text-center text-sm'>
        <p className='text-red-400'>{errors}</p>
      </div>
    </div>);
}
