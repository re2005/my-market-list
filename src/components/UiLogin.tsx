'use client'

import {useState} from "react";
import {signIn} from "@/firebase/auth";
import IconLoading from '@/assets/loading-circle.svg'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleForm = async (event: any) => {
    event.preventDefault()
    setLoading(true)
    const {result, error} = await signIn(email + '@gmail.com', password)
    if (error) {
      setErrors(error.code.replace(/auth\//, '').replace(/-/g, ' '))
    }
    setLoading(false)
  }

  return (
    <div className="form-wrapper">
      <p>
        Login to your account
      </p>
      <form onSubmit={handleForm} className='flex flex-col gap-4 mt-6'>
        <div className='flex flex-col gap-3'>
          <label htmlFor="user" className='flex gap-3 items-center'>
            <p>List name:</p>
            <input onChange={(e) => setEmail(e.target.value)} required name="user" id="user"
                   placeholder="mylist" className='text-black border p-3 rounded'/>
          </label>
          <label htmlFor="password" className='flex gap-3 items-center'>
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password"
                   id="password" placeholder="password" className='text-black border p-3 rounded'/>
          </label>
        </div>
      <button type="submit" className='green-gradient-bg rounded p-2 text-white font-bold flex justify-center'>
        {loading ? <IconLoading className='w-6'/> : 'Login'}
      </button>
      </form>
  <div className='mt-6 w-full text-center text-sm'>
    <p className='text-red-400'>{errors}</p>
  </div>
    </div>);
}
